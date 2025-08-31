import { mockFeedsResponse, mockOrders } from "../__mocks__/mockData";
import orderFeedReducer, { getOrdersThunk, orderFeedThunk, orderInitialState } from "../orderFeedSlice";

jest.mock('@api');

describe('Тестируем orderFeedSlice:', () => {
  test('Тестируем неудачную загрузку orderFeedThunk', () => {
    const orderState = orderFeedReducer(orderInitialState, orderFeedThunk.rejected({name: "Error", message: 'Ошибка загрузки'}, '', undefined));

    expect(orderState.isFeedLoading).toBe(false);
    expect(orderState.error).toBe('Ошибка загрузки');
    expect(orderState.orders).toEqual([]);
    expect(orderState.total).toBe(0);
    expect(orderState.totalToday).toBe(0);
  });

  test('Тестируем удачную загрузку orderFeedThunk', () => {
    const orderState = orderFeedReducer(orderInitialState, orderFeedThunk.fulfilled(mockFeedsResponse, '', undefined));

    expect(orderState.isFeedLoading).toBe(false);
    expect(orderState.error).toBeNull();
    expect(orderState.orders).toEqual(mockFeedsResponse.orders);
    expect(orderState.total).toBe(1500);
    expect(orderState.totalToday).toBe(45);
  });

  test('Тестируем загрузку orderFeedThunk', () => {
    const orderState = orderFeedReducer(orderInitialState, orderFeedThunk.pending('', undefined));

    expect(orderState.isFeedLoading).toBe(true);
    expect(orderState.error).toBeNull();
    expect(orderState.orders).toEqual([]);
    expect(orderState.total).toBe(0);
    expect(orderState.totalToday).toBe(0);
  });

  test('Тестируем неудачную загрузку getOrdersThunk', () => {
    const orderState = orderFeedReducer(orderInitialState, getOrdersThunk.rejected({name: "Error", message: 'Ошибка загрузки'}, '', undefined));

    expect(orderState.isFeedLoading).toBe(false);
    expect(orderState.error).toBe('Ошибка загрузки');
    expect(orderState.orders).toEqual([]);
  });

  test('Тестируем удачную загрузку getOrdersThunk', () => {
    const orderState = orderFeedReducer(orderInitialState, getOrdersThunk.fulfilled(mockOrders, '', undefined));

    expect(orderState.isFeedLoading).toBe(false);
    expect(orderState.error).toBeNull();
    expect(orderState.orders).toEqual(mockOrders);
  });

  test('Тестируем загрузку getOrdersThunk', () => {
    const orderState = orderFeedReducer(orderInitialState, getOrdersThunk.pending('', undefined));

    expect(orderState.isFeedLoading).toBe(true);
    expect(orderState.error).toBeNull();
    expect(orderState.orders).toEqual([]);
  });
})
