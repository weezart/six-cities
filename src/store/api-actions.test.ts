import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import type {Action} from 'redux';
import {APIRoute, FavoriteStatus} from '../const';
import {createAPI} from '../services/api';
import type {Comment, Review} from '../types/types';
import type {State} from '../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeComment,
  makeFakeOffer,
  makeFakeUser,
} from '../utils/mocks';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  fetchCommentsAction,
  fetchFavoritesAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  postCommentAction,
} from './api-actions';

const mapCommentToReview = (comment: Comment): Review => ({
  id: comment.id,
  userName: comment.user.name,
  avatarUrl: comment.user.avatarUrl,
  rating: comment.rating,
  text: comment.comment,
  dateTime: comment.date,
  dateLabel: new Date(comment.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}),
});

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios, {onNoMatch: 'throwException'});
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
    mockAxiosAdapter.reset();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch pending and fulfilled when server response is 200', async () => {
      const offers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, offers);

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual(offers);
    });

    it('should dispatch pending and rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());

      expect(extractActionsTypes(store.getActions())).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch pending and fulfilled when server response is 200', async () => {
      const offer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offer.id}`).reply(200, offer);

      await store.dispatch(fetchOfferAction(offer.id));

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual(offer);
    });

    it('should dispatch rejected with "NOT_FOUND" when server response is 404', async () => {
      const offerId = 'missing-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404);

      await store.dispatch(fetchOfferAction(offerId));

      const actions = store.getActions();
      const rejected = actions.at(1) as ReturnType<typeof fetchOfferAction.rejected>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
      expect(rejected.payload).toBe('NOT_FOUND');
    });

    it('should dispatch rejected without "NOT_FOUND" when server response is 500', async () => {
      const offerId = 'offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(500);

      await store.dispatch(fetchOfferAction(offerId));

      const actions = store.getActions();
      const rejected = actions.at(1) as ReturnType<typeof fetchOfferAction.rejected>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
      expect(rejected.payload).toBeUndefined();
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch pending and fulfilled when server response is 200', async () => {
      const offerId = 'offer-id';
      const nearbyOffers = [makeFakeOffer('nearby-id')];
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`).reply(200, nearbyOffers);

      await store.dispatch(fetchNearbyOffersAction(offerId));

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual(nearbyOffers);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch fulfilled with reviews sorted from newest to oldest', async () => {
      const offerId = 'offer-id';
      const olderComment = makeFakeComment(1, '2024-06-15T12:00:00.000Z');
      const newerComment = {
        ...makeFakeComment(2, '2024-08-15T12:00:00.000Z'),
        comment: 'A newer stay.',
      };
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, [olderComment, newerComment]);

      await store.dispatch(fetchCommentsAction(offerId));

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual([
        mapCommentToReview(newerComment),
        mapCommentToReview(olderComment),
      ]);
    });
  });

  describe('postCommentAction', () => {
    const commentData = {
      offerId: 'offer-id',
      comment: 'A quiet apartment in the center with a very kind host.',
      rating: 5,
    };

    it('should dispatch fulfilled with sorted reviews when server returns an array', async () => {
      const olderComment = makeFakeComment(1, '2024-06-15T12:00:00.000Z');
      const newerComment = makeFakeComment(2, '2024-08-15T12:00:00.000Z');
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${commentData.offerId}`).reply(200, [olderComment, newerComment]);

      await store.dispatch(postCommentAction(commentData));

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof postCommentAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual([
        mapCommentToReview(newerComment),
        mapCommentToReview(olderComment),
      ]);
    });

    it('should load the comment list when server returns a single comment', async () => {
      const postedComment = makeFakeComment(1, '2024-06-15T12:00:00.000Z');
      const listedComment = makeFakeComment(2, '2024-08-15T12:00:00.000Z');
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${commentData.offerId}`).reply(200, postedComment);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${commentData.offerId}`).reply(200, [listedComment]);

      await store.dispatch(postCommentAction(commentData));

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof postCommentAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual([mapCommentToReview(listedComment)]);
    });

    it('should dispatch rejected with an error message when server response is 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${commentData.offerId}`).reply(400);

      await store.dispatch(postCommentAction(commentData));

      const actions = store.getActions();
      const rejected = actions.at(1) as ReturnType<typeof postCommentAction.rejected>;

      expect(extractActionsTypes(actions)).toEqual([
        postCommentAction.pending.type,
        postCommentAction.rejected.type,
      ]);
      expect(rejected.payload).toBe('Unable to send comment. Please try again.');
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch fulfilled with user data when server response is 200', async () => {
      const user = makeFakeUser();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, user);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual(user);
    });

    it('should dispatch fulfilled with null when server response is 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toBeNull();
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch pending and fulfilled when server response is 200', async () => {
      const favorites = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, favorites);

      await store.dispatch(fetchFavoritesAction());

      const actions = store.getActions();
      const fulfilled = actions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractActionsTypes(actions)).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fulfilled.payload).toEqual(favorites);
    });

    it('should dispatch pending and rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);

      await store.dispatch(fetchFavoritesAction());

      expect(extractActionsTypes(store.getActions())).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch fulfilled with the updated offer and refresh favorites', async () => {
      const offer = {...makeFakeOffer(), isFavorite: true};
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${offer.id}/${FavoriteStatus.Yes}`)
        .reply(200, offer);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, [offer]);

      await store.dispatch(changeFavoriteStatusAction({
        offerId: offer.id,
        status: FavoriteStatus.Yes,
      }));

      await vi.waitFor(() => {
        expect(extractActionsTypes(store.getActions())).toEqual([
          changeFavoriteStatusAction.pending.type,
          fetchFavoritesAction.pending.type,
          changeFavoriteStatusAction.fulfilled.type,
          fetchFavoritesAction.fulfilled.type,
        ]);
      });

      const fulfilled = store.getActions().find(
        (action) => action.type === changeFavoriteStatusAction.fulfilled.type,
      ) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

      expect(fulfilled.payload).toEqual(offer);
    });
  });
});
