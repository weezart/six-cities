import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const';
import {makeFakeOffer, makeFakeStore, makeFakeUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import App from './App';

vi.mock('../Map/Map', () => ({
  default: () => null,
}));

describe('Application Routing', () => {
  it('should render main page when user navigates to "/"', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Root]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render login page when user navigates to "/login"', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Login]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should redirect from "/login" to main page when user is authorized', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Login]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
  });

  it('should render favorites page when authorized user navigates to "/favorites"', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Favorites]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should redirect from "/favorites" to login page when user is not authorized', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Favorites]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });

  it('should render offer page when user navigates to "/offer/:id"', () => {
    const offer = {...makeFakeOffer(), title: 'Beautiful loft'};
    const mockHistory = createMemoryHistory({initialEntries: [`/offer/${offer.id}`]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore({
        offer: {
          currentOffer: offer,
          nearbyOffers: [],
          comments: [],
          isOfferNotFound: false,
          isOfferDataLoading: false,
          isCommentSending: false,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText('Beautiful loft')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should render not found page when user navigates to an unknown route', () => {
    const mockHistory = createMemoryHistory({initialEntries: ['/unknown-route']});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });

  it('should render loading screen when authorization status is unknown', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Root]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Unknown,
          user: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByText(/Cities/i)).not.toBeInTheDocument();
  });

  it('should render loading screen when offers are loading', () => {
    const mockHistory = createMemoryHistory({initialEntries: [AppRoute.Root]});
    const {withStoreComponent} = withStore(
      withHistory(<App />, mockHistory),
      makeFakeStore({
        offers: {
          cityName: CITIES[0],
          offers: [],
          isOffersLoading: true,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByText(/Cities/i)).not.toBeInTheDocument();
  });
});
