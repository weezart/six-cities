import {render, screen} from '@testing-library/react';
import {AuthorizationStatus} from '../../const';
import {makeFakeStore, makeFakeUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import HeaderComponent from './Header';

describe('Component: Header', () => {
  it('should render user email and sign out link when user is logged in', () => {
    const user = makeFakeUser();
    const {withStoreComponent} = withStore(
      withHistory(<HeaderComponent isLogged favoritesCount={3} />),
      makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render sign in link when user is not logged in', () => {
    const {withStoreComponent} = withStore(
      withHistory(<HeaderComponent isLogged={false} favoritesCount={0} />),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
