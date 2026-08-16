import { AxiosInstance, isAxiosError } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import {
  loadOffers,
  setAuthorizationStatus,
  setCommentSending,
  setComments,
  setCurrentOffer,
  setIsLoading,
  setNearbyOffers,
  setOfferDataLoading,
  setOfferNotFound,
  setUser
} from './action';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { dropToken, saveToken } from '../services/token';
import { AuthData, Comment, NewCommentData, Offer, Review, UserData } from '../types/types';

const formatCommentDate = (date: string) => (
  new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
);

const mapCommentToReview = (comment: Comment): Review => ({
  id: comment.id,
  userName: comment.user.name,
  avatarUrl: comment.user.avatarUrl,
  rating: comment.rating,
  text: comment.comment,
  dateTime: comment.date,
  dateLabel: formatCommentDate(comment.date)
});

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

export const fetchOfferAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchOffer', async (offerId, { dispatch, extra: api }) => {
  dispatch(setOfferDataLoading(true));
  dispatch(setOfferNotFound(false));
  try {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    dispatch(setCurrentOffer(data));
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      dispatch(setOfferNotFound(true));
      dispatch(setCurrentOffer(null));
      return;
    }
    throw error;
  } finally {
    dispatch(setOfferDataLoading(false));
  }
});

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchNearby', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
  dispatch(setNearbyOffers(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchComments', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
  const reviews = data
    .map(mapCommentToReview)
    .sort((firstReview, secondReview) => (
      new Date(secondReview.dateTime).getTime() - new Date(firstReview.dateTime).getTime()
    ));
  dispatch(setComments(reviews));
});

export const postCommentAction = createAsyncThunk<
  void,
  NewCommentData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>(
  'offer/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api, rejectWithValue }) => {
    dispatch(setCommentSending(true));
    try {
      await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
      await dispatch(fetchCommentsAction(offerId));
    } catch {
      return rejectWithValue('Unable to send comment. Please try again.');
    } finally {
      dispatch(setCommentSending(false));
    }
  }
);

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
