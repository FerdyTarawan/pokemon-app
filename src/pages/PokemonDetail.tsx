import React, { useCallback } from 'react';
import { useQuery } from 'urql';

import Box from 'components/Box';
import Button from 'components/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Text from 'components/Text';
import {
  BasePokemonDetailData,
  GET_POKEMON_DETAIL,
  PokemonDetailData,
} from 'graphql/query';
import { catchPokemon, generateId } from 'helpers/game';
import { capitalizeFirstLetter } from 'helpers/text';
import { useMyPokemon, useRouter, useTranslation } from 'hooks';

const PokemonDetailPage: React.FC = () => {
  const { history, params, pathname } = useRouter();
  const { t } = useTranslation();
  const [result] = useQuery<PokemonDetailData, BasePokemonDetailData>({
    query: GET_POKEMON_DETAIL,
    variables: { name: params.name ?? '' },
  });
  const [, addNewPokemon] = useMyPokemon();
  const isLoading = result.fetching;
  const isOwned = pathname.includes('mypokemon');

  const pokemon = result.data?.pokemon;
  const types = pokemon?.types;
  const abilites = pokemon?.abilities;
  const moves = pokemon?.moves;

  const handleCatchPokemon = useCallback(() => {
    const success = catchPokemon();

    if (success) {
      addNewPokemon({
        id: generateId(),
        image: pokemon?.sprites.front_default ?? '',
        name: pokemon?.name ?? '',
        nickname: 'Bob' + Math.random().toString(),
      });

      history.push('/mypokemon');
    }
  }, [addNewPokemon, pokemon, history]);

  if (isLoading) {
    return <Text textAlign="center">{t('common.state.loading')}</Text>;
  }

  return (
    <Box alignItems="center" p={2}>
      <Box width={[1, 1, 1 / 2, 3 / 4]}>
        <Box alignItems="center">
          <Image
            alt="sprite"
            height={200}
            src={pokemon?.sprites.front_default}
            width={200}
          ></Image>
          <Text fontWeight="medium">
            {capitalizeFirstLetter(pokemon?.name ?? '')}
          </Text>
        </Box>
        {!isOwned && (
          <Button alignSelf="center" onClick={handleCatchPokemon} width="50%">
            {t('common.actions.catch')}
          </Button>
        )}
        {!!types && (
          <Card disableHoverAnimation my={2} px={3}>
            <Text fontWeight="bold">{t('common.terms.type')}</Text>
            <Box flexDirection="row" flexWrap="wrap">
              {types.map((typeDetail, idx) => (
                <Text key={idx} mr={2} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
                  {capitalizeFirstLetter(typeDetail.type.name)}
                </Text>
              ))}
            </Box>
          </Card>
        )}
        {!!abilites && (
          <Card disableHoverAnimation my={2} px={3}>
            <Text fontWeight="bold">{t('common.terms.ability')}</Text>
            <Box flexDirection="row" flexWrap="wrap">
              {abilites.map((abilityDetail, idx) => (
                <Text key={idx} mr={2} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
                  {capitalizeFirstLetter(abilityDetail.ability.name)}
                </Text>
              ))}
            </Box>
          </Card>
        )}
        {!!moves && (
          <Card disableHoverAnimation my={2} px={3}>
            <Text fontWeight="bold">{t('common.terms.move')}</Text>
            <Box flexDirection="row" flexWrap="wrap">
              {moves.map((moveDetail, idx) => (
                <Text key={idx} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
                  {capitalizeFirstLetter(moveDetail.move.name)}
                </Text>
              ))}
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default PokemonDetailPage;
