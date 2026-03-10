import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Цветовая палитра
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
});

const QuantityButton = styled(IconButton)({
  backgroundColor: colors.beige,
  '&:hover': {
    backgroundColor: colors.palePink,
  },
});

function InventoryPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [phone, setPhone] = useState('');

  // Начальные данные для корзины
  const initialCartItems = [
    {
      id: 1,
      name: 'Креветка в чили соусе',
      price: 650,
      quantity: 1,
      category: 'Основные блюда',
      image: '/images/shrimp.jpg'
    },
    {
      id: 2,
      name: 'Картошка по-деревенски',
      price: 250,
      quantity: 2,
      category: 'Закуски',
      image: '/images/potatoes.jpg'
    },
    {
      id: 3,
      name: 'Чизкейк Сан Себастьян',
      price: 390,
      quantity: 1,
      category: 'Десерты',
      image: '/images/cheesecake.jpg'
    }
  ];

  // Загружаем корзину из localStorage при запуске
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        // Если в localStorage пусто, используем начальные данные
        setCartItems(initialCartItems);
        localStorage.setItem('cart', JSON.stringify(initialCartItems));
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
      // В случае ошибки используем начальные данные
      setCartItems(initialCartItems);
    } finally {
      setLoading(false);
    }
  };

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  // Удалить товар
  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setRemoveDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (!selectedItem) return;

    // Фильтруем, удаляя выбранный товар
    const updatedCart = cartItems.filter(item => item.id !== selectedItem.id);
    setCartItems(updatedCart);
    setRemoveDialogOpen(false);
    setSelectedItem(null);
  };

  // Изменить количество
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      // Если количество становится 0, спрашиваем удалить ли
      setSelectedItem(item);
      setRemoveDialogOpen(true);
    } else {
      // Обновляем количество для конкретного товара
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      setCartItems(updatedCart);
    }
  };

  // Посчитать общую сумму
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Оформить заказ
  const handleOrderClick = () => {
    setOrderDialogOpen(true);
  };

  const handleOrderConfirm = () => {
    if (!deliveryAddress || !phone) {
      alert('Пожалуйста, заполните адрес доставки и телефон');
      return;
    }

    alert('Спасибо за заказ! Мы свяжемся с вами для подтверждения.');

    // Очищаем корзину
    setCartItems([]);
    localStorage.removeItem('cart');

    // Закрываем диалог
    setOrderDialogOpen(false);
    setDeliveryAddress('');
    setDeliveryTime('');
    setPhone('');
  };

  // Очистить всю корзину
  const handleClearCart = () => {
    if (window.confirm('Очистить всю корзину?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress sx={{ color: colors.navy }} />
      </Box>
    );
  }

  const total = calculateTotal();

  return (
    <Box>
      {/* Заголовок */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: colors.navy,
            fontWeight: 700,
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '25%',
              width: '50%',
              height: 4,
              background: `linear-gradient(90deg, ${colors.palePink}, ${colors.azalea}, ${colors.skyBlue})`,
              borderRadius: 2
            }
          }}
        >
          Ваша корзина
        </Typography>
      </Box>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
          <ShoppingBagIcon sx={{ fontSize: 60, color: colors.skyBlue, mb: 2 }} />
          <Typography variant="h5" sx={{ color: colors.navy, mb: 2 }}>
            Корзина пуста
          </Typography>
          <Typography variant="body1" sx={{ color: colors.navy, opacity: 0.7, mb: 3 }}>
            Добавьте блюда из нашего меню
          </Typography>
          <Button
            variant="contained"
            href="/marketplace"
            sx={{
              backgroundColor: colors.navy,
              color: 'white',
              borderRadius: '30px',
              padding: '10px 30px',
              '&:hover': {
                backgroundColor: colors.skyBlue,
              }
            }}
          >
            Перейти в меню
          </Button>
        </Paper>
      ) : (
        <>
          {/* Кнопка очистки корзины */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleClearCart}
              startIcon={<DeleteIcon />}
              sx={{
                borderColor: colors.navy,
                color: colors.navy,
                borderRadius: '30px',
                '&:hover': {
                  borderColor: colors.azalea,
                  backgroundColor: colors.palePink,
                }
              }}
            >
              Очистить корзину
            </Button>
          </Box>

          <Grid container spacing={3}>
            {/* Список товаров */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {cartItems.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <StyledCard>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        {/* Фото */}
                        <CardMedia
                          component="img"
                          sx={{
                            width: { xs: '100%', sm: 150 },
                            height: 150,
                            objectFit: 'cover'
                          }}
                          image={item.image}
                          alt={item.name}
                        />

                        {/* Информация */}
                        <CardContent sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h5" sx={{ color: colors.navy, fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                              <Chip
                                label={item.category}
                                size="small"
                                sx={{
                                  backgroundColor: colors.azalea,
                                  color: colors.navy,
                                  mt: 0.5,
                                  mb: 1
                                }}
                              />
                            </Box>
                            <Typography variant="h5" sx={{ color: colors.navy, fontWeight: 700 }}>
                              {item.price * item.quantity} ₽
                            </Typography>
                          </Box>

                          <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7, mb: 2 }}>
                            {item.price} ₽ за порцию
                          </Typography>

                          {/* Количество - РАБОЧИЕ КНОПКИ */}
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <QuantityButton
                                size="small"
                                onClick={() => handleQuantityChange(item, -1)}
                              >
                                <RemoveIcon />
                              </QuantityButton>

                              <Typography sx={{ minWidth: 30, textAlign: 'center', color: colors.navy }}>
                                {item.quantity}
                              </Typography>

                              <QuantityButton
                                size="small"
                                onClick={() => handleQuantityChange(item, 1)}
                              >
                                <AddIcon />
                              </QuantityButton>
                            </Box>

                            {/* Кнопка удаления - РАБОЧАЯ */}
                            <IconButton
                              onClick={() => handleRemoveClick(item)}
                              sx={{ color: colors.navy }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Box>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Итого */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: '16px', position: 'sticky', top: 20 }}>
                <Typography variant="h5" sx={{ color: colors.navy, fontWeight: 600, mb: 2 }}>
                  Итого
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: colors.navy }}>
                        {item.name} x{item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.navy, fontWeight: 500 }}>
                        {item.price * item.quantity} ₽
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: colors.navy }}>
                    Общая сумма:
                  </Typography>
                  <Typography variant="h5" sx={{ color: colors.navy, fontWeight: 700 }}>
                    {total} ₽
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleOrderClick}
                  sx={{
                    backgroundColor: colors.navy,
                    color: 'white',
                    borderRadius: '30px',
                    padding: '12px',
                    '&:hover': {
                      backgroundColor: colors.skyBlue,
                    }
                  }}
                >
                  Оформить заказ
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* Диалог удаления */}
      <Dialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: '16px' }
        }}
      >
        <DialogTitle sx={{ color: colors.navy }}>
          Удалить из корзины?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: colors.navy }}>
            Вы уверены, что хотите удалить "{selectedItem?.name}" из корзины?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setRemoveDialogOpen(false)}
            sx={{ color: colors.navy }}
          >
            Отмена
          </Button>
          <Button
            onClick={handleRemoveConfirm}
            sx={{ color: colors.azalea }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог оформления заказа */}
      <Dialog
        open={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '16px' }
        }}
      >
        <DialogTitle sx={{ color: colors.navy }}>
          Оформление заказа
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Адрес доставки"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Желаемое время доставки"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              placeholder="Например: 19:00"
            />

            <Box sx={{ mt: 3, p: 2, backgroundColor: colors.beige, borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ color: colors.navy, mb: 1 }}>
                Ваш заказ:
              </Typography>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: colors.navy }}>
                    {item.name} x{item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.navy }}>
                    {item.price * item.quantity} ₽
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ color: colors.navy }}>
                  Итого:
                </Typography>
                <Typography variant="h6" sx={{ color: colors.navy }}>
                  {total} ₽
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOrderDialogOpen(false)}
            sx={{ color: colors.navy }}
          >
            Отмена
          </Button>
          <Button
            onClick={handleOrderConfirm}
            variant="contained"
            sx={{
              backgroundColor: colors.navy,
              '&:hover': {
                backgroundColor: colors.skyBlue,
              }
            }}
          >
            Подтвердить заказ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default InventoryPage;