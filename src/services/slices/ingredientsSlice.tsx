import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TIngredientsState = {
  data: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  data: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export const { ingredientsSelector } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
