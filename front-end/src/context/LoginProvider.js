import { node } from 'prop-types';
import { useState, useMemo } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [user, setUser] = useState({});
  const [price, setPrice] = useState(0);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    price,
    setPrice,
  }), [user, price]);

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: node.isRequired,
};

export default LoginProvider;
