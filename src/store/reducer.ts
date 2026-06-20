import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../types/types';
import { OFFERS } from '../mock/offers';
import { CITIES } from '../mock/cities';
import { changeCity, fillOffers } from './action';

type InitialState = {
  city: City;
  offers: Offer[];
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: OFFERS,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
