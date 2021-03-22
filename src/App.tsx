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
import { MyPokemonProvider } from 'context/pokemon';
import theme from 'themes';

const urqlClient = createClient({
  url: `${process.env.REACT_APP_BASE_URL}/graphql`,
});

const MyPokemonPage = React.lazy(() => import('pages/MyPokemon'));
const PokemonDetailPage = React.lazy(() => import('pages/PokemonDetail'));
const PokemonListPage = React.lazy(() => import('pages/PokemonList'));

const App: React.FC = () => {
  return (
    <MyPokemonProvider>
      <ThemeProvider theme={theme}>
        <UrqlProvider value={urqlClient}>
          <Router>
            <Header />
            <React.Suspense fallback={<p>Loading...</p>}>
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
        </UrqlProvider>
      </ThemeProvider>
    </MyPokemonProvider>
  );
};

export default App;
