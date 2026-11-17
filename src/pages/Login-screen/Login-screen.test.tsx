import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../const';
import {loginAction} from '../../store/api-actions';
import {extractActionsTypes, makeFakeStore, makeFakeUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import LoginScreen from './Login-screen';

describe('Component: LoginScreen', () => {
  it('should render sign in form', () => {
    const {withStoreComponent} = withStore(withHistory(<LoginScreen />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should show an error and skip login when password contains spaces', async () => {
    const {withStoreComponent, mockStore} = withStore(withHistory(<LoginScreen />), makeFakeStore());

    render(withStoreComponent);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'max@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'pass word');
    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    expect(screen.getByText('Password must not contain spaces.')).toBeInTheDocument();
    expect(extractActionsTypes(mockStore.getActions())).not.toContain(loginAction.pending.type);
  });

  it('should dispatch login action with valid credentials', async () => {
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(
      withHistory(<LoginScreen />),
      makeFakeStore(),
    );
    mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

    render(withStoreComponent);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'max@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password1');
    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    expect(extractActionsTypes(mockStore.getActions())).toContain(loginAction.pending.type);
  });

  it('should redirect to main page when login succeeds', async () => {
    const history = createMemoryHistory({initialEntries: [AppRoute.Login]});
    const {withStoreComponent, mockAxiosAdapter} = withStore(
      withHistory(<LoginScreen />, history),
      makeFakeStore(),
    );
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, makeFakeUser());

    render(withStoreComponent);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'max@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password1');
    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    expect(history.location.pathname).toBe(AppRoute.Root);
  });

  it('should redirect an authorized user to main page', () => {
    const history = createMemoryHistory({initialEntries: [AppRoute.Login]});
    const {withStoreComponent} = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path={AppRoute.Root} element={<h1>Main page</h1>} />
        </Routes>,
        history,
      ),
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Sign in'})).not.toBeInTheDocument();
  });
});
