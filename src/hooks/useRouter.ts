import { useMemo } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

export const useRouter = () => {
  const params = useParams<Record<string, string | undefined>>();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(
    () => ({
      history,
      location,
      match,
      params,
      pathname: location.pathname,
    }),
    [params, match, location, history],
  );
};
