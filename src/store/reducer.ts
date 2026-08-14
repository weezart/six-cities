import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../types/types';
import { CITIES } from '../mock/cities';
import { changeCity, loadOffers, setAuthorizationStatus, setIsLoading } from './action';
import { AuthorizationStatus } from '../const';

type state = {
  city: City;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  isOffersLoading: boolean;
};

const initialState: state = {
  city: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});

export { reducer };
