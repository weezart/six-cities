import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../../const';
import type { Offer } from '../../types/types';
import { fetchOffersAction } from '../api-actions';

type OffersState = {
  cityName: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  cityName: CITIES[0],
  offers: [],
  isOffersLoading: true,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.cityName = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      });
  },
});

export const { changeCity } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
