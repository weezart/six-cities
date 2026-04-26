import {Link} from 'react-router-dom';

type LogoProps = {
  isActive: boolean;
}

const LogoComponent = ({isActive} : LogoProps) => (
  <Link to="/" className={`header__logo-link ${isActive ? 'header__logo-link--active' : ''} `}>
    <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
  </Link>
);

export default LogoComponent;
