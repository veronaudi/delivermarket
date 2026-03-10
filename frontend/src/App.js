import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/auth';

// Цветовая палитра
const colors = {
  navy: '#214156',      // Темно-синий
  palePink: '#FEE1E6',   // Бледно-розовый
  azalea: '#FFC0A4',     // Персиковый
  skyBlue: '#CB9CE6',    // Голубой
  beige: '#F5EEEB',       // Бежевый
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: colors.navy,
  boxShadow: `0 4px 12px ${colors.navy}40`,
});

const NavButton = styled(Button)({
  color: colors.beige,
  margin: '0 4px',
  '&:hover': {
    backgroundColor: colors.skyBlue,
    color: colors.navy,
  },
});

const Logo = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: `linear-gradient(135deg, ${colors.palePink} 0%, ${colors.azalea} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  flexGrow: 1,
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      fetchBalance();
    }

    setLoading(false);
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await authService.getProfile();
      setBalance(response.data.balance);
    } catch (err) {
      console.error('Failed to load balance:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setBalance(0);
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress sx={{ color: colors.navy }} />
      </Box>
    );
  }

  return (
    <Router>
      <StyledAppBar position="static">
        <Toolbar>
          <Logo variant="h6">
            Cookcat Доставка
          </Logo>

          <NavButton component={Link} to="/">
            Главная
          </NavButton>

          <NavButton component={Link} to="/marketplace">
            Меню
          </NavButton>

          {user ? (
            <>
              <NavButton component={Link} to="/inventory">
                Корзина
              </NavButton>
              <Typography variant="body2" sx={{ color: colors.palePink, mx: 2 }}>
                {user.username}!
              </Typography>
              <NavButton onClick={handleLogout}>
                Выйти
              </NavButton>
            </>
          ) : (
            <>
              <NavButton component={Link} to="/login">
                Войти
              </NavButton>
              <NavButton component={Link} to="/register">
                Регистрация
              </NavButton>
            </>
          )}
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/inventory" element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;