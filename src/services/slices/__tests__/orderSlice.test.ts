import {
  mockGetOrderResponse,
  mockOrder,
  mockOrderResponse,
  mockOrders
} from '../__mocks__/mockData';
import orderSliceReducer, {
  clearOrder,
  orderBurgerThunk,
  orderDetailsThunk,
  orderSliceInitialState
} from '../orderSlice';

jest.mock('@api');

describe('Тестирование слайса orderSlice:', () => {
  test('Тестирование action создания заказа (orderBurgerThunk)', () => {
    const state = orderSliceReducer(
      undefined,
      orderBurgerThunk.pending('', [])
    );
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
    expect(state.order).toBeNull();
  });

  test('Тестирование успешного action создания заказа (orderBurgerThunk)', () => {
    const state = orderSliceReducer(
      orderSliceInitialState,
      orderBurgerThunk.fulfilled(mockOrderResponse, '', [])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  test('Тестирование неудачного action создания заказа (orderBurgerThunk)', () => {
    const state = orderSliceReducer(
      orderSliceInitialState,
      orderBurgerThunk.rejected(
        { name: 'Error', message: 'Ошибка заказа!' },
        '',
        []
      )
    );
    expect(state.orderRequest).toBe(false);
    expect(state.order).toBeNull();
    expect(state.error).toBe('Ошибка заказа!');
  });

  test('Тестирование action получения деталей по заказу (orderDetailsThunk)', () => {
    const state = orderSliceReducer(
      undefined,
      orderDetailsThunk.pending('', 0)
    );
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
    expect(state.feedOrder).toBeNull();
  });

  test('Тестирование успешного action получения деталей по заказу (orderDetailsThunk)', () => {
    const state = orderSliceReducer(
      orderSliceInitialState,
      orderDetailsThunk.fulfilled(mockGetOrderResponse, '', 0)
    );
    expect(state.orderRequest).toBe(false);
    expect(state.feedOrder).toEqual(mockGetOrderResponse.orders[0]);
    expect(state.error).toBeNull();
  });

  test('Тестирование неудачного action получения деталей по заказу (orderDetailsThunk)', () => {
    const state = orderSliceReducer(
      orderSliceInitialState,
      orderDetailsThunk.rejected(
        { name: 'Error', message: 'Ошибка получения заказов!' },
        '',
        0
      )
    );
    expect(state.orderRequest).toBe(false);
    expect(state.feedOrder).toBeNull();
    expect(state.error).toBe('Ошибка получения заказов!');
  });

  test('Тестирование редьюсера clearOrder', () => {
    const state = orderSliceReducer(
      orderSliceInitialState,
      orderDetailsThunk.fulfilled(mockGetOrderResponse, '', 0)
    );
    const clearedState = orderSliceReducer(state, clearOrder());

    expect(clearedState.order).toBeNull();
    expect(clearedState.error).toBeNull();
    expect(clearedState.orderRequest).toBe(false);
  });
});
