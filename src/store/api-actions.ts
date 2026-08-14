import { AxiosInstance, isAxiosError } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadOffers, setAuthorizationStatus, setIsLoading, setUser } from './action';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { dropToken, saveToken } from '../services/token';
import { UserData, AuthData, Offer } from '../types/types';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setIsLoading(true));
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  } finally {
    dispatch(setIsLoading(false));
  }
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return rejectWithValue('Please enter valid email and password.');
      }
      return rejectWithValue('Unable to login. Please try again.');
    }
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
  } finally {
    dropToken();
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});
