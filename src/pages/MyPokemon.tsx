import React from 'react';

import Box from 'components/Box';
import Button from 'components/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Text from 'components/Text';
import { useMyPokemon, useTranslation } from 'hooks';

const MyPokemonPage: React.FC = () => {
  const { t } = useTranslation();
  const [{ pokemons }, , releasePokemon] = useMyPokemon();

  return !pokemons || pokemons.length === 0 ? (
    <Text mt={5} textAlign="center">
      {t('common.state.empty')}
    </Text>
  ) : (
    <Box alignItems="center">
      <Box alignItems="center" width={[1, 1, 1, 3 / 4]}>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          width={1}
        >
          {pokemons?.map((pokemon) => (
            <Box key={pokemon.id} p={3}>
              <Card key={pokemon.id} alignItems="center" p={3}>
                <Image
                  alt="image"
                  height={200}
                  src={pokemon.image}
                  width={200}
                />
                <Text fontWeight="medium">{pokemon.nickname}</Text>
                <Button
                  bg="red"
                  onClick={() => {
                    releasePokemon(pokemon);
                  }}
                  width={3 / 4}
                >
                  {t('common.actions.release')}
                </Button>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MyPokemonPage;
