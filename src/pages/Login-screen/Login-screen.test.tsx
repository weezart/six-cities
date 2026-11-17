import {render, screen} from '@testing-library/react';
import {makeFakeStore} from '../../utils/mocks';
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
});
