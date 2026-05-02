import {Link} from 'react-router-dom';
import LogoComponent from '../Logo/Logo';
import {AppRoute} from '../../const';

type HeaderProps = {
  isLogged: boolean;
  favoritesCount: number;
}

const HeaderComponent = ({isLogged, favoritesCount} : HeaderProps) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <LogoComponent isActive={isLogged} />
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {isLogged === true ? (
              <>
                <li className="header__nav-item user">
                  <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favoritesCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to={AppRoute.Root} className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </>
            ) : (
              <li className="header__nav-item user">
                <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__login">Sign in</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default HeaderComponent;
