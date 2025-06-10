import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import React from "react";

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo linkClass={'header__logo-link'} />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </main>
    </div>
  );
}

export default NotFoundScreen;
