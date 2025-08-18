import { useSelector } from '../../services/store';
import {
  isAuthSelector,
  userRequestSelector,
  userSelector
} from '../../services/slices/userProfileSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteArgs = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteArgs) => {
  const isAuthChecked = useSelector(isAuthSelector);
  const loginUserRequest = useSelector(userRequestSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked || loginUserRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ backgroundLocation: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.backgroundLocation || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  return children;
};
