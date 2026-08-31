import { combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from './offers-slice/offers-slice';
import { offerReducer } from './offer-slice/offer-slice';
import { userReducer } from './user-slice/user-slice';

export const rootReducer = combineReducers({
  offers: offersReducer,
  offer: offerReducer,
  user: userReducer,
});
