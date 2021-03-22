import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'urql';

import {
  GET_POKEMON_LIST,
  PokemonListData,
  PokemonListVariable,
  Pokemons,
} from 'graphql/query';
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
    limit: 20,
    offset: 0,
  });

  const [result] = useQuery<PokemonListData, PokemonListVariable>({
    query: GET_POKEMON_LIST,
    variables: queryVariable,
  });

  const isLoading = result.fetching;
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
    return <p>{t('common.state.loading')}</p>;
  }

  return (
    <div>
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          onClick={handlePokemonDetail(pokemon.name)}
          style={{
            border: '1px #f2f2f2 solid',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img alt="image" src={pokemon.image} />
          <p>{pokemon.name}</p> &nbsp;
          <p>{`Owned: ${myPokemon.counts[pokemon.name] ?? 0}`}</p>
        </div>
      ))}
      {isLastPage ? (
        <p>No more Pokemon!!</p>
      ) : (
        <button onClick={handleLoadMore}>{t('common.actions.loadMore')}</button>
      )}
    </div>
  );
};

export default PokemonListPage;
