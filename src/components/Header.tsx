import React, { useCallback } from 'react';

import { ReactComponent as Pokeball } from 'assets/pokeball.svg';
import Box from 'components/Box';
import { useRouter, useTranslation } from 'hooks';

const Header: React.FC = () => {
  const { history } = useRouter();
  const { t } = useTranslation();

  const handleNavigatePokemonList = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleNavigateMyPokemonList = useCallback(() => {
    history.push(`/mypokemon`);
  }, [history]);

  return (
    <Box bg="blue" flexDirection="row" justifyContent="space-between" p={3}>
      <Box pt={1}>
        <Pokeball height={26} width={26} />
      </Box>
      <Box flexDirection="row">
        <Box
          color="concrete"
          mx={2}
          onClick={handleNavigatePokemonList}
          p={2}
          style={{ cursor: 'pointer' }}
        >
          {t('menu.pokemonList')}
        </Box>
        <Box
          color="concrete"
          mx={2}
          onClick={handleNavigateMyPokemonList}
          p={2}
          style={{ cursor: 'pointer' }}
        >
          {t('menu.myPokemon')}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
