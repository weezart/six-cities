import {AuthorizationStatus} from '../../const';
import {makeFakeUser} from '../../utils/mocks';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {userReducer} from './user-slice';

const emptyAction = {type: ''};

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const result = userReducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = userReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set user and "Auth" with "checkAuthAction.fulfilled" and user payload', () => {
    const user = makeFakeUser();

    const result = userReducer(
      initialState,
      checkAuthAction.fulfilled(user, '', undefined),
    );

    expect(result.user).toEqual(user);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set "NoAuth" with "checkAuthAction.fulfilled" and null payload', () => {
    const user = makeFakeUser();
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
    };

    const result = userReducer(state, checkAuthAction.fulfilled(null, '', undefined));

    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set user and "Auth" with "loginAction.fulfilled"', () => {
    const user = makeFakeUser();

    const result = userReducer(
      initialState,
      loginAction.fulfilled(user, '', {email: user.email, password: 'password1'}),
    );

    expect(result.user).toEqual(user);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should reset user with "logoutAction.fulfilled"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUser(),
    };

    const result = userReducer(state, logoutAction.fulfilled(undefined, '', undefined));

    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
