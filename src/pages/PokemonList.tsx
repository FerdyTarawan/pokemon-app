import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'urql';

import Box from 'components/Box';
import Button from 'components/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Text from 'components/Text';
import {
  GET_POKEMON_LIST,
  PokemonListData,
  PokemonListVariable,
  Pokemons,
} from 'graphql/query';
import { capitalizeFirstLetter } from 'helpers/text';
import {
  useImmutableState,
  useMyPokemon,
  useRouter,
  useToggle,
  useTranslation,
} from 'hooks';

const PokemonListPage: React.FC = () => {
  const { history } = useRouter();
  const { t } = useTranslation();
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [myPokemon] = useMyPokemon();

  const [
    queryVariable,
    setQueryVariable,
  ] = useImmutableState<PokemonListVariable>({
    limit: 12,
    offset: 0,
  });

  const [result] = useQuery<PokemonListData, PokemonListVariable>({
    query: GET_POKEMON_LIST,
    variables: queryVariable,
  });

  const isLoading = result.fetching;
  const isError = result.error;
  const [isLastPage, toggleLastPage] = useToggle(false);

  useEffect(() => {
    const newPokemons = result.data?.pokemons.results;

    if (newPokemons && newPokemons.length > 0) {
      setPokemons(pokemons.concat(newPokemons));

      const isNextAvailable = !!result.data?.pokemons.next;

      if (!isNextAvailable) {
        toggleLastPage();
      }
    }
  }, [result.data]);

  const handleLoadMore = useCallback(() => {
    setQueryVariable((draft) => {
      draft.offset += draft.limit;
    });
  }, [setQueryVariable]);

  const handlePokemonDetail = useCallback(
    (name: string) => () => {
      history.push(`/pokemon/${name}`);
    },
    [history],
  );

  if (isLoading && pokemons.length === 0) {
    return (
      <Text mt={5} textAlign="center">
        {t('common.state.loading')}
      </Text>
    );
  } else if (isError) {
    return (
      <Text mt={5} textAlign="center">
        {t('common.state.error')}
      </Text>
    );
  }

  return (
    <Box alignItems="center">
      <Box alignItems="center" width={[1, 1, 1, 3 / 4]}>
        <Box flexDirection="row" flexWrap="wrap">
          {pokemons.map((pokemon) => (
            <Box key={pokemon.id} p={3} width={[1, 1 / 2, 1 / 3, 1 / 4]}>
              <Card
                key={pokemon.id}
                flexDirection="row"
                onClick={handlePokemonDetail(pokemon.name)}
                style={{ cursor: 'pointer' }}
              >
                <Image alt={pokemon.name} src={pokemon.image} />
                <Box>
                  <Text fontWeight="medium">
                    {capitalizeFirstLetter(pokemon.name)}
                  </Text>{' '}
                  <Text mt={-1}>{`${t('common.terms.owned')}: ${
                    myPokemon.counts[pokemon.name] ?? 0
                  }`}</Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        {!isLastPage && (
          <Button my={2} onClick={handleLoadMore} width={200}>
            {t('common.actions.loadMore')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PokemonListPage;
