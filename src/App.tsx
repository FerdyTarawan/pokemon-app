import { ThemeProvider } from '@emotion/react';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { Provider as UrqlProvider, createClient } from 'urql';

import Header from 'components/Header';
import Text from 'components/Text';
import { MyPokemonProvider } from 'context/pokemon';
import { useTranslation } from 'hooks';
import theme from 'themes';

const urqlClient = createClient({
  url: `${process.env.REACT_APP_BASE_URL}/graphql`,
});

const MyPokemonPage = React.lazy(() => import('pages/MyPokemon'));
const PokemonDetailPage = React.lazy(() => import('pages/PokemonDetail'));
const PokemonListPage = React.lazy(() => import('pages/PokemonList'));

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <UrqlProvider value={urqlClient}>
        <MyPokemonProvider>
          <Router>
            <Header />
            <React.Suspense
              fallback={
                <Text textAlign="center">{t('common.state.loading')}</Text>
              }
            >
              <Switch>
                <Route component={PokemonListPage} exact path="/" />
                <Route component={MyPokemonPage} exact path="/mypokemon" />
                <Route
                  component={PokemonDetailPage}
                  path={['/pokemon/:name', '/mypokemon/:name']}
                />
                <Redirect to="/" />
              </Switch>
            </React.Suspense>
          </Router>
        </MyPokemonProvider>
      </UrqlProvider>
    </ThemeProvider>
  );
};

export default App;
