import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const colors = {
  navy: '#214156',
  palePink: '#FEE1E6',
  azalea: '#FFC0A4',
  skyBlue: '#CB9CE6',
  beige: '#F5EEEB',
};

const HeroSection = styled(Box)({
  background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.skyBlue} 100%)`,
  color: 'white',
  padding: '80px 0',
  borderRadius: '0 0 40px 40px',
  marginBottom: '40px',
});

const FeatureCard = styled(Card)({
  backgroundColor: colors.beige,
  borderRadius: '16px',
  padding: '24px',
  height: '100%',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

function HomePage() {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Cookcat Delivery
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: colors.palePink }}>
            Вкусная еда с доставкой на дом
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/menu"
            sx={{
              backgroundColor: colors.azalea,
              color: colors.navy,
              fontSize: '1.2rem',
              padding: '12px 40px',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: colors.palePink,
              }
            }}
          >
            Смотреть меню
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={10} md={4}>
            <FeatureCard>
              <DeliveryDiningIcon sx={{ fontSize: 48, color: colors.navy, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: colors.navy }}>
                Быстрая доставка
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Доставим ваш заказ в течение 30-60 минут
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={10} md={4}>
            <FeatureCard>
              <RestaurantIcon sx={{ fontSize: 48, color: colors.navy, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: colors.navy }}>
                Свежие продукты
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Готовим только из свежих ингредиентов
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={10} md={4}>
            <FeatureCard>
              <AccessTimeIcon sx={{ fontSize: 48, color: colors.navy, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: colors.navy }}>
                Работаем круглосуточно
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Принимаем заказы 24/7 без выходных
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;