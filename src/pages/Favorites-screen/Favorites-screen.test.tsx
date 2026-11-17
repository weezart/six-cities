import type {ReactElement} from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import {extractActionsTypes, makeFakeOffer, makeFakeStore, makeFakeUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import FavoritesScreen from './Favorites-screen';

const renderFavoritesScreen = (component: ReactElement, state = makeFakeStore()) => {
  const history = createMemoryHistory({initialEntries: [AppRoute.Favorites]});
  const store = withStore(
    withHistory(
      <Routes>
        <Route path={AppRoute.Favorites} element={component} />
        <Route path={AppRoute.Login} element={<h1>Login page</h1>} />
      </Routes>,
      history,
    ),
    state,
  );

  render(store.withStoreComponent);

  return store;
};

describe('Component: FavoritesScreen', () => {
  it('should render loading screen', () => {
    renderFavoritesScreen(
      <FavoritesScreen isLogged />,
      makeFakeStore({
        favorites: {
          favorites: [],
          isFavoritesLoading: true,
        },
      }),
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });

  it('should render an empty favorites message', () => {
    renderFavoritesScreen(<FavoritesScreen isLogged />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render favorite offers grouped by city', () => {
    const parisOffer = {...makeFakeOffer('paris-offer'), title: 'Paris loft'};
    const cologneOffer = {
      ...makeFakeOffer('cologne-offer'),
      title: 'Cologne loft',
      city: {
        ...makeFakeOffer().city,
        name: 'Cologne',
      },
    };

    renderFavoritesScreen(
      <FavoritesScreen isLogged />,
      makeFakeStore({
        favorites: {
          favorites: [parisOffer, cologneOffer],
          isFavoritesLoading: false,
        },
      }),
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Paris loft')).toBeInTheDocument();
    expect(screen.getByText('Cologne loft')).toBeInTheDocument();
  });

  it('should redirect an unauthorized bookmark click to login', async () => {
    const offer = makeFakeOffer();

    renderFavoritesScreen(
      <FavoritesScreen isLogged={false} />,
      makeFakeStore({
        favorites: {
          favorites: [offer],
          isFavoritesLoading: false,
        },
      }),
    );

    await userEvent.click(screen.getByRole('button', {name: 'In bookmarks'}));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should dispatch favorite status change for an authorized bookmark click', async () => {
    const offer = {...makeFakeOffer(), isFavorite: true};
    const {mockStore} = renderFavoritesScreen(
      <FavoritesScreen isLogged />,
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
        favorites: {
          favorites: [offer],
          isFavoritesLoading: false,
        },
      }),
    );

    await userEvent.click(screen.getByRole('button', {name: 'In bookmarks'}));

    expect(extractActionsTypes(mockStore.getActions())).toContain(changeFavoriteStatusAction.pending.type);
  });
});
