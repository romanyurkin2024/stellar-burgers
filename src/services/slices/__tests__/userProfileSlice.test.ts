import { mockUser } from '../__mocks__/mockData';
import userReducer, {
  checkUserAuthThunk,
  clearAllFormFields,
  logoutUserThunk,
  setUser,
  updateUserThunk,
  userLoginThunk,
  userRegisterThunk
} from '../userProfileSlice';
import { userInitialState } from '../userProfileSlice';

jest.mock('@api');
const registerPayload = { email: '', name: '', password: '' };

describe('Тестирование user slice:', () => {
  test('userRegisterThunk.pending', () => {
    const state = userReducer(
      userInitialState,
      userRegisterThunk.pending('', registerPayload)
    );

    expect(state.isAuthenticated).toBe(false);
    expect(state.loginUserRequest).toBe(true);
    expect(state.error).toBe('');
  });

  test('userRegisterThunk.fulfilled', () => {
    const state = userReducer(
      userInitialState,
      userRegisterThunk.fulfilled(mockUser, '', registerPayload)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe('');
  });

  test('userRegisterThunk.rejected', () => {
    const state = userReducer(
      userInitialState,
      userRegisterThunk.rejected(
        { message: 'Регистрация не удалась', name: 'Error' },
        '',
        registerPayload
      )
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Регистрация не удалась');
  });

  test('userLoginThunk.pending', () => {
    const state = userReducer(
      userInitialState,
      userLoginThunk.pending('', registerPayload)
    );
    expect(state.isAuthenticated).toBe(false);
    expect(state.loginUserRequest).toBe(true);
  });

  test('userLoginThunk.fulfilled', () => {
    const state = userReducer(
      userInitialState,
      userLoginThunk.fulfilled(mockUser, '', registerPayload)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe('');
  });

  test('userLoginThunk.rejected', () => {
    const error = { message: 'Вход не удался', name: 'Error' };
    const state = userReducer(
      userInitialState,
      userLoginThunk.rejected(error, '', registerPayload)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Вход не удался');
  });

  test('logoutUserThunk.pending', () => {
    const state = userReducer(userInitialState, logoutUserThunk.pending(''));
    expect(state.loginUserRequest).toBe(true);
  });

  test('logoutUserThunk.fulfilled', () => {
    const loggedInState = {
      ...userInitialState,
      user: mockUser,
      isAuthenticated: true
    };
    const state = userReducer(
      loggedInState,
      logoutUserThunk.fulfilled(undefined, '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('');
    expect(state.loginUserRequest).toBe(false);
  });

  test('logoutUserThunk.rejected', () => {
    const error = { message: 'Ошибка выхода', name: 'Error' };
    const state = userReducer(
      userInitialState,
      logoutUserThunk.rejected(error, '')
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Ошибка выхода');
  });

  test('checkUserAuthThunk.pending', () => {
    const state = userReducer(userInitialState, checkUserAuthThunk.pending(''));
    expect(state.loginUserRequest).toBe(true);
  });

  test('checkUserAuthThunk.fulfilled', () => {
    const state = userReducer(
      userInitialState,
      checkUserAuthThunk.fulfilled(mockUser, '', undefined)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('checkUserAuthThunk.rejected', () => {
    const error = { message: 'Ошибка проверки', name: 'Error' };
    const state = userReducer(
      userInitialState,
      checkUserAuthThunk.rejected(error, '')
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Ошибка проверки');
  });

  test('updateUserThunk.pending', () => {
    const state = userReducer(
      userInitialState,
      updateUserThunk.pending('', {})
    );
    expect(state.loginUserRequest).toBe(true);
  });

  test('updateUserThunk.fulfilled', () => {
    const response = { user: mockUser, success: true };
    const state = userReducer(
      userInitialState,
      updateUserThunk.fulfilled(response, '', {})
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe('');
  });

  test('updateUserThunk.rejected', () => {
    const error = { message: 'Ошибка обновления', name: 'Error' };
    const state = userReducer(
      userInitialState,
      updateUserThunk.rejected(error, '', {})
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('Ошибка обновления');
  });
  test('clearAllFormFields', () => {
    const withError = { ...userInitialState, error: 'Ошибка' };
    const state = userReducer(withError, clearAllFormFields());
    expect(state.error).toBe('');
  });

  test('setUser', () => {
    const state = userReducer(userInitialState, setUser(mockUser));
    expect(state.user).toEqual(mockUser);
  });
});
