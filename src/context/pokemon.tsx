import { Draft } from 'immer';
import React, { useMemo } from 'react';

import { POKEMON_PERSIST_KEY } from 'constants/game';
import { useImmutableReducer, useLocalStorage, useMount } from 'hooks';

export interface MyPokemonData {
  id: string;
  image: string;
  name: string;
  nickname: string;
}

export interface MyPokemonList {
  counts: Record<string, number>;
  pokemons: MyPokemonData[];
}

interface MyPokemonAction {
  type: 'ADD' | 'RELEASE' | 'RESTORE';
  payload: MyPokemonData | MyPokemonList;
}

const initialState: MyPokemonList = {
  counts: {},
  pokemons: [],
};

const MyPokemonReducer = (
  draft: Draft<MyPokemonList>,
  action: MyPokemonAction,
) => {
  switch (action.type) {
    case 'ADD': {
      const payload = action.payload as MyPokemonData;

      if (draft.counts[payload.name]) {
        draft.counts[payload.name] += 1;
      } else {
        draft.counts[payload.name] = 1;
      }

      draft.pokemons = draft.pokemons.concat(payload);

      return;
    }
    case 'RELEASE': {
      const payload = action.payload as MyPokemonData;

      draft.counts[payload.name] -= 1;
      draft.pokemons = draft.pokemons.filter(
        (pokemon) => pokemon.id !== payload.id,
      );

      return;
    }
    case 'RESTORE': {
      const payload = action.payload as MyPokemonList;

      draft.counts = payload.counts;
      draft.pokemons = payload.pokemons;

      return;
    }
  }
};

export interface MyPokemonContextValue {
  dispatch: React.Dispatch<MyPokemonAction>;
  state: MyPokemonList;
}
export const MyPokemonContext = React.createContext<
  MyPokemonContextValue | undefined
>(undefined);

export const MyPokemonProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useImmutableReducer<MyPokemonList, MyPokemonAction>(
    MyPokemonReducer,
    initialState,
  );

  const [myStoredPokemon] = useLocalStorage<MyPokemonList>(POKEMON_PERSIST_KEY);

  useMount(() => {
    if (state.pokemons.length === 0 && myStoredPokemon) {
      dispatch({ payload: myStoredPokemon, type: 'RESTORE' });
    }
  });

  const contextValue = useMemo(() => ({ dispatch, state }), [state]);

  return (
    <MyPokemonContext.Provider value={contextValue}>
      {children}
    </MyPokemonContext.Provider>
  );
};
