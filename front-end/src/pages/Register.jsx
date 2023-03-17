import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../images/beer_logo_text_2.png';
import LoginContext from '../context/LoginContext';
import { setLocalStorage } from '../services/localStorage';
import { isRegisterFormValid } from '../utils/ValidationUtils';

const theme = createTheme();

const routesLogin = {
  customer: 'customer/products',
  seller: 'seller/orders',
  administrator: 'admin/manage',
};

export default function FormRegister() {
  const { setUser } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const { data } = response;
      if (data.role) {
        setUser(data);
        setLocalStorage('user', data);
        navigate(`/${routesLogin[data.role]}`);
      } else {
        setRegisterError(data.message);
      }
    } catch (error) {
      console.error(error);
      setRegisterError('Ocorreu um erro ao tentar fazer registro');
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
          <img
            className="img-logo"
            src={ logo }
            alt="logo-speed-beer"
          />
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              value={ name }
              autoComplete="name"
              autoFocus
              onChange={ handleNameChange }
            />
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
              color="warning"
              type="submit"
              fullWidth
              variant="contained"
              sx={ { mt: 3, mb: 2 } }
              disabled={ !isRegisterFormValid(name, email, password) }
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
