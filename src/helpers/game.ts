import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_CATCH_SUCCESS_RATE } from 'constants/game';

export const catchPokemon = (successRate = DEFAULT_CATCH_SUCCESS_RATE) =>
  Math.random() > successRate;

export const generateId = () => uuidv4();
