interface BasePokemonsQueryResult<T> {
  pokemons: {
    next: string | null;
    results: T;
  };
}

interface Pokemon {
  id: string;
  image: string;
  name: string;
}

export type Pokemons = Pokemon[];

export type PokemonListData = BasePokemonsQueryResult<Pokemons>;

export interface PokemonListVariable {
  limit: number;
  offset: number;
}

export const GET_POKEMON_LIST = `
  query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        next
        results {
          id
          image
          name
        }
      }
    }
  `;

export interface BasePokemonDetailData {
  name: string;
}

interface PokemonAbility {
  ability: BasePokemonDetailData;
}

interface PokemonMove {
  move: BasePokemonDetailData;
}

interface PokemonType {
  type: BasePokemonDetailData;
}

interface PokemonSprites {
  front_default: string;
}

interface PokemonDetail extends Pokemon {
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
  types: PokemonType[];
  message: string;
  status: string;
}

export interface PokemonDetailData {
  pokemon: PokemonDetail;
}

export const GET_POKEMON_DETAIL = `
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }`;
