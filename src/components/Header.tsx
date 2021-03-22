import React from 'react';

import { useRouter } from 'hooks';

const Header: React.FC = () => {
  const { history } = useRouter();

  return (
    <ul>
      <li onClick={() => history.push('/')}>Pokemon List</li>
      <li onClick={() => history.push('/mypokemon')}>My Pokemon</li>
    </ul>
  );
};

export default Header;
