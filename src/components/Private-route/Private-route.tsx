import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const {children} = props;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
