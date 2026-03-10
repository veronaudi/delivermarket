import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px ${colors.navy}40`,
  },
  '& .MuiCardMedia-root': {
    height: '200px !important',
    minHeight: '200px !important',
    maxHeight: '200px !important'
  }
});

const AddButton = styled(Button)({
  backgroundColor: colors.navy,
  color: 'white',
  borderRadius: '30px',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: colors.skyBlue,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const addToCart = (item) => {
    // Получаем текущую корзину из localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // Если товар уже есть, увеличиваем количество
      cart[existingItemIndex].quantity += 1;
    } else {
      // Если товара нет, добавляем новый с quantity: 1
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        quantity: 1
      });
    }

    // Сохраняем обновленную корзину
    localStorage.setItem('cart', JSON.stringify(cart));

    // Показываем уведомление
    setSnackbarMessage(`${item.name} добавлен в корзину`);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

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
                  objectFit: 'cover',
                  width: '100%',
                  height: '200px',
                  backgroundColor: colors.beige
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
                <AddButton
                  fullWidth
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={(e) => {
                    e.stopPropagation(); // Предотвращаем всплытие события
                    addToCart(item);
                  }}
                  sx={{ mt: 2 }}
                >
                  Добавить в корзину
                </AddButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Уведомление о добавлении в корзину */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            backgroundColor: colors.navy,
            color: 'white',
            '& .MuiAlert-icon': {
              color: colors.azalea
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MarketplacePage;