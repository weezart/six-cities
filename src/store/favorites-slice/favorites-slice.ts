import { createSlice } from '@reduxjs/toolkit';
import type { Offer } from '../../types/types';
import { fetchFavoritesAction, logoutAction } from '../api-actions';

type FavoritesState = {
  favorites: Offer[];
  isFavoritesLoading: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorites = [];
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
