import { rootReducer } from '../../store';

describe('Проверка rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toBeDefined();

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('user');
  });
});
