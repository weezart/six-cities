import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, isAxiosError } from 'axios';
import { APIRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import type { AppDispatch, State } from '../types/state';
import type { AuthData, Comment, NewCommentData, Offer, Review, UserData } from '../types/types';

const formatCommentDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const mapCommentToReview = (comment: Comment): Review => ({
  id: comment.id,
  userName: comment.user.name,
  avatarUrl: comment.user.avatarUrl,
  rating: comment.rating,
  text: comment.comment,
  dateTime: comment.date,
  dateLabel: formatCommentDate(comment.date)
});

const sortReviews = (reviews: Review[]) =>
  reviews.sort(
    (firstReview, secondReview) =>
      new Date(secondReview.dateTime).getTime() - new Date(firstReview.dateTime).getTime()
  );

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: string;
};

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, ThunkConfig>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, string, ThunkConfig>(
  'offer/fetchOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return rejectWithValue('NOT_FOUND');
      }
      throw error;
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string, ThunkConfig>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, ThunkConfig>(
  'offer/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    return sortReviews(data.map(mapCommentToReview));
  }
);

export const postCommentAction = createAsyncThunk<Review[], NewCommentData, ThunkConfig>(
  'offer/postComment',
  async ({ offerId, comment, rating }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Comment | Comment[]>(`${APIRoute.Comments}/${offerId}`, {
        comment,
        rating
      });
      if (Array.isArray(data)) {
        return sortReviews(data.map(mapCommentToReview));
      }
      const { data: commentsData } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
      return sortReviews(commentsData.map(mapCommentToReview));
    } catch (error) {
      return rejectWithValue('Unable to send comment. Please try again.');
    }
  }
);

export const checkAuthAction = createAsyncThunk<UserData | null, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch {
      return null;
    }
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkConfig>(
  'user/login',
  async ({ email, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return rejectWithValue('Please enter valid email and password.');
      }
      return rejectWithValue('Unable to login. Please try again.');
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
    } finally {
      dropToken();
    }
  }
);
