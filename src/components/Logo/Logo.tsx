import {Link} from 'react-router-dom';

type LogoProps = {
  linkClass: string;
}

const LogoComponent = ({linkClass} : LogoProps) => {
  return (
    <Link to="/" className={linkClass}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default LogoComponent;
