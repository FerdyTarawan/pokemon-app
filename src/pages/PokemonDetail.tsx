import React, { useCallback } from 'react';
import { useQuery } from 'urql';

import {
  BasePokemonDetailData,
  GET_POKEMON_DETAIL,
  PokemonDetailData,
} from 'graphql/query';
import { catchPokemon, generateId } from 'helpers/game';
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
    return <p>{t('common.state.loading')}</p>;
  }

  return (
    <div>
      <img alt="sprite" src={pokemon?.sprites.front_default}></img>
      <p>{pokemon?.name}</p>
      {!isOwned && <button onClick={handleCatchPokemon}>Catch!!</button>}
      {!!types && (
        <div>
          <strong>Type: </strong>
          {types.map((typeDetail, idx) => (
            <p key={idx}>{typeDetail.type.name}</p>
          ))}
        </div>
      )}
      {!!abilites && (
        <div>
          <strong>Ability: </strong>
          {abilites.map((abilityDetail, idx) => (
            <p key={idx}>{abilityDetail.ability.name}</p>
          ))}
        </div>
      )}
      {!!moves && (
        <div>
          <strong>Move: </strong>
          {moves.map((moveDetail, idx) => (
            <p key={idx}>{moveDetail.move.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonDetailPage;
