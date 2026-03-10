import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import authService from '../services/auth';

// Цветовая палитра
const colors = {
  navy: '#214156',
  palePink: '#FEE1E6',
  azalea: '#FFC0A4',
  skyBlue: '#CB9CE6',
  beige: '#F5EEEB',
};

const StyledPaper = styled(Paper)({
  borderRadius: '16px',
  boxShadow: `0 8px 24px ${colors.navy}20`,
});

const StyledButton = styled(Button)({
  backgroundColor: colors.navy,
  color: 'white',
  borderRadius: '30px',
  padding: '12px',
  '&:hover': {
    backgroundColor: colors.skyBlue,
  },
});

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData.username, formData.password);

      // Полная перезагрузка страницы для обновления состояния приложения
      window.location.href = '/';

    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: colors.navy,
            fontWeight: 700,
            mb: 3
          }}
        >
          Вход на сайт
        </Typography>

        <StyledPaper elevation={3} sx={{ p: 4 }}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: '8px',
                backgroundColor: colors.palePink,
                color: colors.navy
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />

            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Войти'}
            </StyledButton>

            <Typography align="center" sx={{ color: colors.navy }}>
              Впервые у нас?{' '}
              <Link
                to="/register"
                style={{
                  color: colors.skyBlue,
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Создать аккаунт
              </Link>
            </Typography>
          </form>
        </StyledPaper>
      </Box>
    </Container>
  );
}

export default LoginPage;