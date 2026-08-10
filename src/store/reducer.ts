import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../types/types';
import { OFFERS } from '../mock/offers';
import { CITIES } from '../mock/cities';
import { changeCity, loadOffers, setAuthorizationStatus } from './action';
import { AuthorizationStatus } from '../const';

type state = {
  city: City;
  offers: Offer[];
  authorizationStatus: string;
  isOffersLoading: boolean;
};

const initialState: state = {
  city: CITIES[0],
  offers: OFFERS,
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
      state.isOffersLoading = false;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
