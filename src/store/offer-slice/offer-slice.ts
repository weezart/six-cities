import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer, Review } from '../../types/types';
import {
  changeFavoriteStatusAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  postCommentAction
} from '../api-actions';

type OfferState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferNotFound: boolean;
  isOfferDataLoading: boolean;
  isCommentSending: boolean;
};

const initialState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferNotFound: false,
  isOfferDataLoading: false,
  isCommentSending: false
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clearOfferData(state) {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.comments = [];
      state.isOfferNotFound = false;
    },
    setOfferNotFound(state, action: PayloadAction<boolean>) {
      state.isOfferNotFound = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.isOfferNotFound = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.isOfferDataLoading = false;
        state.currentOffer = null;
        if (action.payload === 'NOT_FOUND') {
          state.isOfferNotFound = true;
        }
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.currentOffer?.id === action.payload.id) {
          state.currentOffer = action.payload;
        }
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentSending = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentSending = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isCommentSending = false;
      });
  },
});

export const { clearOfferData, setOfferNotFound } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
