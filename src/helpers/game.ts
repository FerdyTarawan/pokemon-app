import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_CATCH_SUCCESS_RATE } from 'constants/game';
import { MyPokemonList } from 'context/pokemon';

export const catchPokemon = (successRate = DEFAULT_CATCH_SUCCESS_RATE) =>
  Math.random() > successRate;

export const generateId = () => uuidv4();

export const isNicknameValid = (state: MyPokemonList, nickname: string) =>
  nickname !== '' &&
  !state.pokemons.find(
    (pokemon) => pokemon.nickname.toLowerCase() === nickname.toLowerCase(),
  );
