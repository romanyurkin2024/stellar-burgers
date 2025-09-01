import { rootReducer } from '../../store';
import { constructorInitialState } from '../burgerConstructorSlice';
import { ingredientsInitialState } from '../ingredientsSlice';
import { orderInitialState } from '../orderFeedSlice';
import { orderSliceInitialState } from '../orderSlice';
import { userInitialState } from '../userProfileSlice';

describe('Проверка rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toBeDefined();

    const expectedState = {
      ingredients: ingredientsInitialState,
      burgerConstructor: constructorInitialState,
      order: orderSliceInitialState,
      feed: orderInitialState,
      user: userInitialState
    };
    
    expect(initialState).toEqual(expectedState);
  });
});
