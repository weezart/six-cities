import type {ReactElement} from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import {changeCity} from '../../store/offers-slice/offers-slice';
import {extractActionsTypes, makeFakeOffer, makeFakeStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import MainScreen from './Main-screen';

vi.mock('../../components/Map/Map', () => ({
  default: () => <div>Map</div>,
}));

const renderMainScreen = (component: ReactElement, state = makeFakeStore()) => {
  const history = createMemoryHistory({initialEntries: [AppRoute.Root]});
  const store = withStore(
    withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={component} />
        <Route path={AppRoute.Login} element={<h1>Login page</h1>} />
      </Routes>,
      history,
    ),
    state,
  );

  render(store.withStoreComponent);

  return store;
};

describe('Component: MainScreen', () => {
  it('should render an empty city message', () => {
    renderMainScreen(<MainScreen isLogged={false} />);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render offers for the current city', () => {
    const expensiveOffer = {...makeFakeOffer('expensive'), title: 'Expensive loft', price: 300};
    const cheapOffer = {...makeFakeOffer('cheap'), title: 'Cheap loft', price: 80};

    renderMainScreen(
      <MainScreen isLogged={false} />,
      makeFakeStore({
        offers: {
          cityName: 'Paris',
          offers: [expensiveOffer, cheapOffer],
          isOffersLoading: false,
        },
      }),
    );

    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByText('Expensive loft')).toBeInTheDocument();
    expect(screen.getByText('Cheap loft')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
  });

  it('should dispatch change city action', async () => {
    const {mockStore} = renderMainScreen(<MainScreen isLogged={false} />);

    await userEvent.click(screen.getByRole('button', {name: 'Cologne'}));

    expect(mockStore.getActions()).toContainEqual(changeCity('Cologne'));
  });

  it('should reorder offers when the sort option changes', async () => {
    const expensiveOffer = {...makeFakeOffer('expensive'), title: 'Expensive loft', price: 300};
    const cheapOffer = {...makeFakeOffer('cheap'), title: 'Cheap loft', price: 80};

    renderMainScreen(
      <MainScreen isLogged={false} />,
      makeFakeStore({
        offers: {
          cityName: 'Paris',
          offers: [expensiveOffer, cheapOffer],
          isOffersLoading: false,
        },
      }),
    );

    const offerTitles = () => screen.getAllByRole('link', {name: /loft/i}).map((link) => link.textContent);

    expect(offerTitles()).toEqual(['Expensive loft', 'Cheap loft']);

    await userEvent.click(screen.getByText('Price: low to high'));

    expect(offerTitles()).toEqual(['Cheap loft', 'Expensive loft']);
  });

  it('should redirect an unauthorized bookmark click to login', async () => {
    const offer = makeFakeOffer();

    renderMainScreen(
      <MainScreen isLogged={false} />,
      makeFakeStore({
        offers: {
          cityName: 'Paris',
          offers: [offer],
          isOffersLoading: false,
        },
      }),
    );

    await userEvent.click(screen.getByRole('button', {name: 'To bookmarks'}));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should dispatch favorite status change for an authorized bookmark click', async () => {
    const offer = makeFakeOffer();
    const {mockStore} = renderMainScreen(
      <MainScreen isLogged />,
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: null,
        },
        offers: {
          cityName: 'Paris',
          offers: [offer],
          isOffersLoading: false,
        },
      }),
    );

    await userEvent.click(screen.getByRole('button', {name: 'To bookmarks'}));

    expect(extractActionsTypes(mockStore.getActions())).toContain(changeFavoriteStatusAction.pending.type);
  });
});
