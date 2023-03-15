import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../images/beer_logo_text_2.png';
import LoginContext from '../context/LoginContext';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import { isLoginFormValid } from '../utils/ValidationUtils';

const theme = createTheme();

const routesLogin = {
  customer: 'customer/products',
  seller: 'seller/orders',
  administrator: 'admin/manage',
};

export default function FormLogin() {
  const { setUser } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorage('user');
    if (user && user.role) {
      navigate(`/${routesLogin[user.role]}`);
    }
  }, [navigate]);

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      const { data } = response;
      if (data.role) {
        setUser(data);
        setLocalStorage('user', data);
        navigate(`/${routesLogin[data.role]}`, { replace: true });
      } else {
        setLoginError('Você não tem uma conta');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Ocorreu um erro ao tentar fazer login');
    }
  };

  return (
    <ThemeProvider theme={ theme }>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={ {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <img src={ logo } alt="sla" style={ { height: '30vh' } } />
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={ email }
              autoComplete="email"
              autoFocus
              onChange={ handleEmailChange }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={ password }
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ handlePasswordChange }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={ { mt: 3, mb: 2 } }
              disabled={ !isLoginFormValid(email, password) }
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={ () => navigate('/register') } >
                  {"Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
