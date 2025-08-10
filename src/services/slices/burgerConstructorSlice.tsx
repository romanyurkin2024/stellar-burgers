import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

type BurgerConstructorSliceType = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: BurgerConstructorSliceType = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorBurgerSelector: (state) => state
  },
  reducers: {
    setBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuid();
        return { payload: { id, ...ingredient } };
      }
    },
    toUpIngredient(state, action: PayloadAction<number>) {
      const initialArray = state.ingredients;
      const ingredientIndex = action.payload;
      initialArray.splice(
        ingredientIndex - 1,
        0,
        initialArray.splice(ingredientIndex, 1)[0]
      );
    },
    toDownIngredient(state, action: PayloadAction<number>) {
      const initialArray = state.ingredients;
      const ingredientIndex = action.payload;
      initialArray.splice(
        ingredientIndex + 1,
        0,
        initialArray.splice(ingredientIndex, 1)[0]
      );
    },
    deleteIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteAllIngredients(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  toUpIngredient,
  toDownIngredient,
  addIngredient,
  deleteIngredient,
  deleteAllIngredients
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
export const { constructorBurgerSelector } = burgerConstructorSlice.selectors;
