import type {ReactElement} from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import type {Offer} from '../../types/types';
import {extractActionsTypes, makeFakeOffer, makeFakeStore, makeFakeUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import OfferScreen from './Offer-screen';

vi.mock('../../components/Map/Map', () => ({
  default: () => <div>Map</div>,
}));

const renderOfferScreen = (component: ReactElement, offer: Offer, state = makeFakeStore()) => {
  const history = createMemoryHistory({initialEntries: [`/offer/${offer.id}`]});
  const store = withStore(
    withHistory(
      <Routes>
        <Route path={AppRoute.Offer} element={component} />
        <Route path={AppRoute.Login} element={<h1>Login page</h1>} />
      </Routes>,
      history,
    ),
    state,
  );

  render(store.withStoreComponent);

  return store;
};

const offerState = (offer: Offer | null, overrides = {}) => ({
  currentOffer: offer,
  nearbyOffers: [],
  comments: [],
  isOfferNotFound: false,
  isOfferDataLoading: false,
  isCommentSending: false,
  ...overrides,
});

describe('Component: OfferScreen', () => {
  it('should render loading screen', () => {
    const offer = makeFakeOffer();

    renderOfferScreen(
      <OfferScreen isLogged={false} />,
      offer,
      makeFakeStore({
        offer: offerState(null, {isOfferDataLoading: true}),
      }),
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByText('Other places in the neighbourhood')).not.toBeInTheDocument();
  });

  it('should render not found screen', () => {
    const offer = makeFakeOffer();

    renderOfferScreen(
      <OfferScreen isLogged={false} />,
      offer,
      makeFakeStore({
        offer: offerState(null, {isOfferNotFound: true}),
      }),
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });

  it('should render offer details without a review form for a guest', () => {
    const offer = {...makeFakeOffer(), title: 'Beautiful loft'};

    renderOfferScreen(
      <OfferScreen isLogged={false} />,
      offer,
      makeFakeStore({
        offer: offerState(offer),
      }),
    );

    expect(screen.getByRole('heading', {name: 'Beautiful loft'})).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });

  it('should render review form for an authorized user', () => {
    const offer = makeFakeOffer();

    renderOfferScreen(
      <OfferScreen isLogged />,
      offer,
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
        offer: offerState(offer),
      }),
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('should redirect an unauthorized bookmark click to login', async () => {
    const offer = makeFakeOffer();

    renderOfferScreen(
      <OfferScreen isLogged={false} />,
      offer,
      makeFakeStore({
        offer: offerState(offer),
      }),
    );

    await userEvent.click(screen.getByRole('button', {name: /bookmarks/i}));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should dispatch favorite status change for an authorized bookmark click', async () => {
    const offer = makeFakeOffer();
    const {mockStore} = renderOfferScreen(
      <OfferScreen isLogged />,
      offer,
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
        offer: offerState(offer),
      }),
    );

    await userEvent.click(screen.getByRole('button', {name: /bookmarks/i}));

    expect(extractActionsTypes(mockStore.getActions())).toContain(changeFavoriteStatusAction.pending.type);
  });
});
