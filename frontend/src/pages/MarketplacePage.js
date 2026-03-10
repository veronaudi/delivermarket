import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Цвета как в главной странице
const colors = {
  navy: '#214156',
  palePink: '#FEE1E6',
  azalea: '#FFC0A4',
  skyBlue: '#CB9CE6',
  beige: '#F5EEEB',
};

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s',
  borderRadius: '16px',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px ${colors.navy}40`,
  },
  '& .MuiCardMedia-root': {
    height: '200px !important', // фиксированная высота для всех фото
    minHeight: '200px !important',
    maxHeight: '200px !important'
  }
});

// Данные меню
const menuItems = [
  // Основные блюда
  {
    id: 1,
    name: 'Креветка в чили соусе',
    description: 'Сочные креветки в остром соусе',
    price: 650,
    category: 'Основные блюда',
    image: '/images/shrimp.jpg'
  },
  {
    id: 2,
    name: 'Мини кебаб',
    description: 'Маленькие кебабы из баранины',
    price: 450,
    category: 'Основные блюда',
    image: '/images/kebab.jpg'
  },
  {
    id: 3,
    name: 'Дамплинги с курицей',
    description: 'Китайские пельмени с курицей',
    price: 390,
    category: 'Основные блюда',
    image: '/images/dumplings.jpg'
  },

  // Закуски
  {
    id: 4,
    name: 'Картошка по-деревенски',
    description: 'Хрустящий картофель с чесноком',
    price: 250,
    category: 'Закуски',
    image: '/images/potatoes.jpg'
  },
  {
    id: 5,
    name: 'Сосиски-осьминожки',
    description: 'Забавные сосиски для детей',
    price: 320,
    category: 'Закуски',
    image: '/images/octopus.jpg'
  },

  // Супы
  {
    id: 6,
    name: 'Томатный суп с буковками',
    description: 'Нежный суп с макаронами-буквами',
    price: 350,
    category: 'Супы',
    image: '/images/tomato-soup.jpg'
  },
  {
    id: 7,
    name: 'Сливочный суп с креветкой',
    description: 'Крем-суп с тигровыми креветками',
    price: 520,
    category: 'Супы',
    image: '/images/creamy-soup.jpg'
  },

  // Десерты
  {
    id: 8,
    name: 'Чизкейк Сан Себастьян',
    description: 'Баскский чизкейк с корочкой',
    price: 390,
    category: 'Десерты',
    image: '/images/cheesecake.jpg'
  },
  {
    id: 9,
    name: 'Чуррос',
    description: 'Испанские пончики с шоколадом',
    price: 280,
    category: 'Десерты',
    image: '/images/churros.jpg'
  }
];

function MarketplacePage() {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: colors.navy,
          fontWeight: 700,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Наше меню
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <StyledCard>
              <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    objectFit: 'cover',  // cover - обрезает, contain - масштабирует с полным показом
                    width: '100%',
                    height: '200px',
                    backgroundColor: colors.beige  // фон для фото с соотношением сторон
                  }}
                />
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: colors.navy }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.navy, mb: 2, opacity: 0.7 }}>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ color: colors.navy, fontWeight: 700 }}>
                    {item.price} ₽
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.skyBlue }}>
                    {item.category}
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MarketplacePage;