import { v4 as uuidv4 } from 'uuid';

import { DEFAUT_CATCH_SUCCESS_RATE } from 'constants/game';

export const catchPokemon = (sucessRate = DEFAUT_CATCH_SUCCESS_RATE) =>
  Math.random() > sucessRate;

export const generateId = () => uuidv4();
