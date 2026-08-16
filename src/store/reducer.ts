import { createReducer } from '@reduxjs/toolkit';
import { Offer, Review, UserData } from '../types/types';
import {
  changeCity,
  clearOfferData,
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
import { AuthorizationStatus, CITIES } from '../const';

type state = {
  cityName: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  isOffersLoading: boolean;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferNotFound: boolean;
  isOfferDataLoading: boolean;
  isCommentSending: boolean;
};

const initialState: state = {
  cityName: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isOffersLoading: true,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferNotFound: false,
  isOfferDataLoading: false,
  isCommentSending: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(clearOfferData, (state) => {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.comments = [];
      state.isOfferNotFound = false;
    })
    .addCase(setOfferNotFound, (state, action) => {
      state.isOfferNotFound = action.payload;
    })
    .addCase(setOfferDataLoading, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setCommentSending, (state, action) => {
      state.isCommentSending = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
      if (action.payload === AuthorizationStatus.NoAuth) {
        state.user = null;
      }
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});

export { reducer };
