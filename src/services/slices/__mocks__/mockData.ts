import { TIngredient, TConstructorIngredient } from '@utils-types';
import { TOrder } from '@utils-types';

export const mockOrders: TOrder[] = [
  {
    _id: 'order123',
    status: 'done',
    name: 'Test Burger 1',
    createdAt: '2025-08-31T12:00:00.000Z',
    updatedAt: '2025-08-31T12:05:00.000Z',
    number: 1001,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: 'order124',
    status: 'pending',
    name: 'Test Burger 2',
    createdAt: '2025-08-31T13:00:00.000Z',
    updatedAt: '2025-08-31T13:05:00.000Z',
    number: 1002,
    ingredients: ['ingredient3']
  }
];

export const mockFeedsResponse = {
  success: true,
  orders: mockOrders,
  total: 1500,
  totalToday: 45
};

export const mockIngredient: TIngredient = {
  _id: '123',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
};

export const mockConstructorIngredient: TConstructorIngredient = {
  ...mockIngredient,
  id: 'uuid-123'
};

export const mockOrder: TOrder = {
  _id: 'order123',
  status: 'done',
  name: 'Test Order',
  createdAt: '2025-08-31T12:00:00.000Z',
  updatedAt: '2025-08-31T12:05:00.000Z',
  number: 1010,
  ingredients: ['ingredient1', 'ingredient2']
};

export const mockOrderResponse = {
  order: mockOrder,
  name: 'Test Order Name',
  success: true
};

export const mockGetOrderResponse = {
  orders: mockOrders,  
  success: true
};

export const mockUser = {
  email: 'test@example.com',
  name: 'Test User'
};
