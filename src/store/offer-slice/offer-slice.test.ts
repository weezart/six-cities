import {FavoriteStatus} from '../../const';
import {makeFakeOffer, makeFakeReview} from '../../utils/mocks';
import {
  changeFavoriteStatusAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  postCommentAction,
} from '../api-actions';
import {clearOfferData, offerReducer, setOfferNotFound} from './offer-slice';

const emptyAction = {type: ''};

const initialState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferNotFound: false,
  isOfferDataLoading: false,
  isCommentSending: false,
};

describe('Offer slice', () => {
  it('should return initial state with empty action', () => {
    const result = offerReducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = offerReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should clear offer data with "clearOfferData" action', () => {
    const state = {
      ...initialState,
      currentOffer: makeFakeOffer(),
      nearbyOffers: [makeFakeOffer('nearby-id')],
      comments: [makeFakeReview()],
      isOfferNotFound: true,
      isOfferDataLoading: true,
      isCommentSending: true,
    };

    const result = offerReducer(state, clearOfferData());

    expect(result.currentOffer).toBeNull();
    expect(result.nearbyOffers).toEqual([]);
    expect(result.comments).toEqual([]);
    expect(result.isOfferNotFound).toBe(false);
    expect(result.isOfferDataLoading).toBe(true);
    expect(result.isCommentSending).toBe(true);
  });

  it('should set "isOfferNotFound" with "setOfferNotFound" action', () => {
    const result = offerReducer(initialState, setOfferNotFound(true));

    expect(result.isOfferNotFound).toBe(true);
  });

  it('should set loading state with "fetchOfferAction.pending"', () => {
    const state = {
      ...initialState,
      isOfferNotFound: true,
    };

    const result = offerReducer(state, fetchOfferAction.pending('', 'offer-id'));

    expect(result.isOfferDataLoading).toBe(true);
    expect(result.isOfferNotFound).toBe(false);
  });

  it('should set current offer with "fetchOfferAction.fulfilled"', () => {
    const offer = makeFakeOffer();

    const result = offerReducer(
      {...initialState, isOfferDataLoading: true},
      fetchOfferAction.fulfilled(offer, '', offer.id),
    );

    expect(result.currentOffer).toEqual(offer);
    expect(result.isOfferDataLoading).toBe(false);
  });

  it('should set "isOfferNotFound" with "fetchOfferAction.rejected" and "NOT_FOUND" payload', () => {
    const result = offerReducer(
      {...initialState, currentOffer: makeFakeOffer(), isOfferDataLoading: true},
      fetchOfferAction.rejected(null, '', 'missing-id', 'NOT_FOUND'),
    );

    expect(result.currentOffer).toBeNull();
    expect(result.isOfferDataLoading).toBe(false);
    expect(result.isOfferNotFound).toBe(true);
  });

  it('should not set "isOfferNotFound" with "fetchOfferAction.rejected" without "NOT_FOUND" payload', () => {
    const result = offerReducer(
      {...initialState, currentOffer: makeFakeOffer(), isOfferDataLoading: true},
      fetchOfferAction.rejected(new Error('Server error'), '', 'offer-id'),
    );

    expect(result.currentOffer).toBeNull();
    expect(result.isOfferDataLoading).toBe(false);
    expect(result.isOfferNotFound).toBe(false);
  });

  it('should set nearby offers with "fetchNearbyOffersAction.fulfilled"', () => {
    const nearbyOffers = [makeFakeOffer('nearby-id')];

    const result = offerReducer(
      initialState,
      fetchNearbyOffersAction.fulfilled(nearbyOffers, '', 'offer-id'),
    );

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should update current and nearby offers with "changeFavoriteStatusAction.fulfilled"', () => {
    const currentOffer = makeFakeOffer('current-id');
    const nearbyOffer = makeFakeOffer('nearby-id');
    const updatedCurrentOffer = {...currentOffer, isFavorite: true};
    const state = {
      ...initialState,
      currentOffer,
      nearbyOffers: [nearbyOffer, currentOffer],
    };

    const result = offerReducer(
      state,
      changeFavoriteStatusAction.fulfilled(
        updatedCurrentOffer,
        '',
        {offerId: currentOffer.id, status: FavoriteStatus.Yes},
      ),
    );

    expect(result.currentOffer).toEqual(updatedCurrentOffer);
    expect(result.nearbyOffers).toEqual([nearbyOffer, updatedCurrentOffer]);
  });

  it('should set comments with "fetchCommentsAction.fulfilled"', () => {
    const comments = [makeFakeReview()];

    const result = offerReducer(
      initialState,
      fetchCommentsAction.fulfilled(comments, '', 'offer-id'),
    );

    expect(result.comments).toEqual(comments);
  });

  it('should set "isCommentSending" to true with "postCommentAction.pending"', () => {
    const result = offerReducer(
      initialState,
      postCommentAction.pending('', {offerId: 'offer-id', comment: 'Text', rating: 5}),
    );

    expect(result.isCommentSending).toBe(true);
  });

  it('should set comments with "postCommentAction.fulfilled"', () => {
    const comments = [makeFakeReview()];

    const result = offerReducer(
      {...initialState, isCommentSending: true},
      postCommentAction.fulfilled(
        comments,
        '',
        {offerId: 'offer-id', comment: 'Text', rating: 5},
      ),
    );

    expect(result.comments).toEqual(comments);
    expect(result.isCommentSending).toBe(false);
  });

  it('should set "isCommentSending" to false with "postCommentAction.rejected"', () => {
    const result = offerReducer(
      {...initialState, isCommentSending: true},
      postCommentAction.rejected(
        null,
        '',
        {offerId: 'offer-id', comment: 'Text', rating: 5},
        'Unable to send comment. Please try again.',
      ),
    );

    expect(result.isCommentSending).toBe(false);
  });
});
