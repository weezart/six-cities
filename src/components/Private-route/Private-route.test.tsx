import {render, screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeFakeStore, makeFakeUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import PrivateRoute from './Private-route';

describe('Component: PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    const {withStoreComponent} = withStore(
      withHistory(
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <PrivateRoute>
                <h1>Private content</h1>
              </PrivateRoute>
            }
          />
        </Routes>,
      ),
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeFakeUser(),
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('should redirect to login page when user is not authorized', () => {
    const {withStoreComponent} = withStore(
      withHistory(
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <PrivateRoute>
                <h1>Private content</h1>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<h1>Login page</h1>} />
        </Routes>,
      ),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });
});
