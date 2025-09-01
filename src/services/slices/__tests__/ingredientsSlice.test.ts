import { TIngredient } from '@utils-types';
import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { getIngredientsApi } from '@api';

jest.mock('@api');

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 10,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('Тестируем ingredientsSlice:', () => {
  test('Тестируем REQUEST ассинхронного экшена fetchIngredients: ', () => {
    const pendingState = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(pendingState.loading).toBe(true);
    expect(pendingState.error).toBeNull();
    expect(pendingState.data).toEqual([]);
  });

  test('Тестируем FAILED ассинхронного экшена fetchIngredients:', () => {
    const error = {
      message: 'Ошибка загрузки'
    };

    const nextState = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(
        { name: 'Error', message: 'Ошибка загрузки' },
        '',
        undefined
      )
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки');
    expect(nextState.data).toEqual([]);
  });

  test('Тестируем SUCCESS ассинхронного экшена fetchIngredients:', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.data).toEqual(mockIngredients);
  });
});
