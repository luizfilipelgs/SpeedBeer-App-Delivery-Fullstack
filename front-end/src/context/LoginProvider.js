import { node } from 'prop-types';
import { useState, useMemo } from 'react';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextValue = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);

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
