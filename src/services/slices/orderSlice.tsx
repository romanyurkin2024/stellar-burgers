import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type orderSliceType = {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null;
  feedOrder: TOrder | null;
};

export const orderSliceInitialState: orderSliceType = {
  order: null,
  orderRequest: false,
  error: null,
  feedOrder: null
};

export const orderBurgerThunk = createAsyncThunk(
  'order/createOrder',
  async (order: string[]) => {
    const data = await orderBurgerApi(order);
    return data;
  }
);

export const orderDetailsThunk = createAsyncThunk(
  'order/orderInformation',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: orderSliceInitialState,
  reducers: {
    clearOrder(state) {
      state.orderRequest = false;
      state.order = null;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || '';
      })
      .addCase(orderDetailsThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderDetailsThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.feedOrder = action.payload.orders[0];
      })
      .addCase(orderDetailsThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || '';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order.order;
export const isOrderRequest = (state: RootState) => state.order.orderRequest;
export const feedOrderSelector = (state: RootState) => state.order.feedOrder;
export default orderSlice.reducer;
