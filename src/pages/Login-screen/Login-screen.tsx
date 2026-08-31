import LogoComponent from '../../components/Logo/Logo';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/selectors';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setErrorMessage(null);

    if (password.includes(' ')) {
      setErrorMessage('Password must not contain spaces.');
      return;
    }

    const result = await dispatch(loginAction({ email, password }));
    if (loginAction.fulfilled.match(result)) {
      navigate(AppRoute.Root, { replace: true });
      return;
    }

    setErrorMessage(result.payload ?? 'Unable to login. Please try again.');
  }, [dispatch, email, navigate, password]);
  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    void handleSubmit(evt);
  }, [handleSubmit]);
  const handleEmailChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  }, []);
  const handlePasswordChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  }, []);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} replace />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <LogoComponent isActive={false} />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
