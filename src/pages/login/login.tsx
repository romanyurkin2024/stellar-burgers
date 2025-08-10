import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  errorSelector,
  userLoginThunk
} from '../../services/slices/userProfileSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(errorSelector);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(userLoginThunk({ email, password })).unwrap();
      setEmail('');
      setPassword('');
      navigate(backgroundLocation);
    } catch {
      navigate('/login');
    }
  };

  return (
    <LoginUI
      errorText={errorText || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
