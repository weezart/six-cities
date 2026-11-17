import {CITIES, FavoriteStatus} from '../../const';
import {makeFakeOffer} from '../../utils/mocks';
import {changeFavoriteStatusAction, fetchOffersAction} from '../api-actions';
import {changeCity, offersReducer} from './offers-slice';

const emptyAction = {type: ''};

const initialState = {
  cityName: CITIES[0],
  offers: [],
  isOffersLoading: true,
};

describe('Offers slice', () => {
  it('should return initial state with empty action', () => {
    const result = offersReducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = offersReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const result = offersReducer(initialState, changeCity('Amsterdam'));

    expect(result.cityName).toBe('Amsterdam');
  });

  it('should set "isOffersLoading" to true with "fetchOffersAction.pending"', () => {
    const state = {
      ...initialState,
      isOffersLoading: false,
    };

    const result = offersReducer(state, fetchOffersAction.pending('', undefined));

    expect(result.isOffersLoading).toBe(true);
  });

  it('should set offers with "fetchOffersAction.fulfilled"', () => {
    const offer = makeFakeOffer();

    const result = offersReducer(
      initialState,
      fetchOffersAction.fulfilled([offer], '', undefined),
    );

    expect(result.offers).toEqual([offer]);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set "isOffersLoading" to false with "fetchOffersAction.rejected"', () => {
    const result = offersReducer(initialState, fetchOffersAction.rejected(null, '', undefined));

    expect(result.isOffersLoading).toBe(false);
  });

  it('should replace offer with the same id with "changeFavoriteStatusAction.fulfilled"', () => {
    const offer = makeFakeOffer('offer-1');
    const anotherOffer = makeFakeOffer('offer-2');
    const updatedOffer = {...offer, isFavorite: true};
    const state = {
      ...initialState,
      offers: [offer, anotherOffer],
    };

    const result = offersReducer(
      state,
      changeFavoriteStatusAction.fulfilled(
        updatedOffer,
        '',
        {offerId: offer.id, status: FavoriteStatus.Yes},
      ),
    );

    expect(result.offers).toEqual([updatedOffer, anotherOffer]);
  });
});
