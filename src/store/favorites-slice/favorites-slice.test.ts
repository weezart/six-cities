import {makeFakeOffer} from '../../utils/mocks';
import {fetchFavoritesAction, logoutAction} from '../api-actions';
import {favoritesReducer} from './favorites-slice';

const emptyAction = {type: ''};

const initialState = {
  favorites: [],
  isFavoritesLoading: false,
};

describe('Favorites slice', () => {
  it('should return initial state with empty action', () => {
    const result = favoritesReducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = favoritesReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set "isFavoritesLoading" to true with "fetchFavoritesAction.pending"', () => {
    const result = favoritesReducer(initialState, fetchFavoritesAction.pending('', undefined));

    expect(result.isFavoritesLoading).toBe(true);
  });

  it('should set favorites with "fetchFavoritesAction.fulfilled"', () => {
    const favorites = [makeFakeOffer()];

    const result = favoritesReducer(
      {...initialState, isFavoritesLoading: true},
      fetchFavoritesAction.fulfilled(favorites, '', undefined),
    );

    expect(result.favorites).toEqual(favorites);
    expect(result.isFavoritesLoading).toBe(false);
  });

  it('should set "isFavoritesLoading" to false with "fetchFavoritesAction.rejected"', () => {
    const result = favoritesReducer(
      {...initialState, isFavoritesLoading: true},
      fetchFavoritesAction.rejected(null, '', undefined),
    );

    expect(result.isFavoritesLoading).toBe(false);
  });

  it('should clear favorites with "logoutAction.fulfilled"', () => {
    const state = {
      favorites: [makeFakeOffer()],
      isFavoritesLoading: false,
    };

    const result = favoritesReducer(state, logoutAction.fulfilled(undefined, '', undefined));

    expect(result.favorites).toEqual([]);
  });
});
