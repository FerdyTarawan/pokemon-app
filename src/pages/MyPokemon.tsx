import React, { useCallback } from 'react';

import { useMyPokemon, useRouter } from 'hooks';

const MyPokemonPage: React.FC = () => {
  const { history } = useRouter();
  const [{ pokemons }, , releasePokemon] = useMyPokemon();

  const navigateToDetail = useCallback(
    (name: string) => () => {
      history.push(`/mypokemon/${name}`);
    },
    [history],
  );

  return (
    <div>
      {pokemons?.map((pokemon) => (
        <>
          <div key={pokemon.id} onClick={navigateToDetail(pokemon.name)}>
            <img alt="image" src={pokemon.image} />
            <p>{pokemon.nickname}</p>
          </div>
          <button
            onClick={() => {
              releasePokemon(pokemon);
            }}
          >
            Release
          </button>
        </>
      ))}
    </div>
  );
};

export default MyPokemonPage;
