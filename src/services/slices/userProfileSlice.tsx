import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type UserProfile = {
  error: string;
  loginUserRequest: boolean;
  user: TUser | null;
  isAuthenticated: boolean;
};

const initialState: UserProfile = {
  user: null,
  error: '',
  loginUserRequest: false,
  isAuthenticated: false
};

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkUserAuth',
  async () => {
    const data = await getUserApi();
    return data.user;
  }
);

export const userLoginThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const { accessToken, refreshToken, user } = await loginUserApi(data);
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const userRegisterThunk = createAsyncThunk(
  'user/create',
  async (data: TRegisterData) => {
    const { accessToken, refreshToken, user } = await registerUserApi(data);

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/resetPassword',
  updateUserApi
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAllFormFields(state) {
      state.error = '';
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    errorSelector: (state) => state.error,
    userSelector: (state) => state.user,
    isAuthSelector: (state) => state.isAuthenticated,
    userRequestSelector: (state) => state.loginUserRequest
  },
  extraReducers(builder) {
    builder.addCase(userRegisterThunk.pending, (state) => {
      state.loginUserRequest = true;
      state.isAuthenticated = false;
    });
    builder.addCase(userRegisterThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loginUserRequest = false;
      state.error = action.error.message || '';
    });
    builder.addCase(userRegisterThunk.fulfilled, (state, action) => {
      state.loginUserRequest = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(userLoginThunk.pending, (state) => {
      state.isAuthenticated = false;
      state.loginUserRequest = true;
    });
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loginUserRequest = false;
      state.error = action.error.message || '';
    });
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.loginUserRequest = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(updateUserThunk.pending, (state) => {
      state.loginUserRequest = true;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.loginUserRequest = false;
      state.error = action.error.message || '';
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.loginUserRequest = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = '';
    });
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.loginUserRequest = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginUserRequest = false;
      state.error = '';
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loginUserRequest = false;
      state.isAuthenticated = false;
    });
    builder.addCase(checkUserAuthThunk.pending, (state) => {
      state.loginUserRequest = true;
    });
    builder.addCase(checkUserAuthThunk.fulfilled, (state, action) => {
      state.loginUserRequest = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(checkUserAuthThunk.rejected, (state, action) => {
      state.loginUserRequest = false;
      state.error = action.error.message || '';
      state.isAuthenticated = false;
    });
  }
});

export const {
  errorSelector,
  userSelector,
  isAuthSelector,
  userRequestSelector
} = userProfileSlice.selectors;
export const { clearAllFormFields, setUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;
