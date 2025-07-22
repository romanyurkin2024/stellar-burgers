import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type orderFeedSliceType = {
  isFeedLoading: boolean;
  error: string | null;
};

const initialState: TOrdersData & orderFeedSliceType = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isFeedLoading: false
};

export const orderFeedThunk = createAsyncThunk('feed/getOrders', async () => {
  const data = await getFeedsApi();
  return data;
});

const orderFeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday,
    ordersSelector: (state) => state.orders,
    isGetFeedRequest: (state) => state.isFeedLoading
  },
  extraReducers(builder) {
    builder
      .addCase(orderFeedThunk.pending, (state) => {
        state.isFeedLoading = true;
      })
      .addCase(orderFeedThunk.fulfilled, (state, action) => {
        state.isFeedLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(orderFeedThunk.rejected, (state, action) => {
        state.isFeedLoading = false;
        state.error = action.error.message || '';
      });
  }
});

export default orderFeedSlice.reducer;
export const {
  totalSelector,
  totalTodaySelector,
  ordersSelector,
  isGetFeedRequest
} = orderFeedSlice.selectors;
