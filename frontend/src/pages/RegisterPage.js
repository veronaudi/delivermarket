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

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 8) {
      setError('Пароль должен быть не менее 8 символов');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.register(
        formData.username,
        formData.password,
        formData.email
      );

      setSuccess(response.message || 'Регистрация успешна!');

      // Перенаправляем на главную с полной перезагрузкой
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (err) {
      const errorData = err.response?.data;
      if (typeof errorData === 'object') {
        const errors = Object.values(errorData).flat();
        setError(errors.join(', '));
      } else {
        setError(errorData || 'Ошибка регистрации');
      }
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
          Регистрация
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

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                borderRadius: '8px',
                backgroundColor: colors.azalea,
                color: colors.navy
              }}
            >
              {success}
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
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
              helperText="Минимум 8 символов"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />

            <TextField
              fullWidth
              label="Подтверждение пароля"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Зарегистрироваться'}
            </StyledButton>

            <Typography align="center" sx={{ color: colors.navy }}>
              Уже есть аккаунт?{' '}
              <Link
                to="/login"
                style={{
                  color: colors.skyBlue,
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Войти
              </Link>
            </Typography>
          </form>
        </StyledPaper>
      </Box>
    </Container>
  );
}

export default RegisterPage;