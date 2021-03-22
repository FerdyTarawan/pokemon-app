import { useCallback, useContext, useEffect } from 'react';

import { POKEMON_PERSIST_KEY } from 'constants/game';
import {
  MyPokemonContext,
  MyPokemonData,
  MyPokemonList,
} from 'context/pokemon';
import { useLocalStorage } from 'hooks';

export const useMyPokemon = (): [
  MyPokemonList,
  (newPokemon: MyPokemonData) => void,
  (releasedPokemon: MyPokemonData) => void,
] => {
  const pokemonContext = useContext(MyPokemonContext);
  const { dispatch, state } = pokemonContext || {};
  const [, setStoredPokemon] = useLocalStorage<MyPokemonList>(
    POKEMON_PERSIST_KEY,
  );

  if (!state || !dispatch) {
    throw new Error('Failed to load context');
  }

  useEffect(() => {
    setStoredPokemon(state);
  }, [state]);

  const addNewPokemon = useCallback(
    (newPokemon: MyPokemonData) => {
      dispatch({ payload: newPokemon, type: 'ADD' });
    },
    [dispatch],
  );

  const releasePokemon = useCallback(
    (releasedPokemon: MyPokemonData) => {
      dispatch({ payload: releasedPokemon, type: 'RELEASE' });
    },
    [dispatch],
  );

  return [state, addNewPokemon, releasePokemon];
};
