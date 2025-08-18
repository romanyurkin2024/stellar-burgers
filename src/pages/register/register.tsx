import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import {
  clearAllFormFields,
  errorSelector,
  userRegisterThunk,
  userSelector
} from '../../services/slices/userProfileSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(userSelector);
  const error = useSelector(errorSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUserData: TRegisterData = {
      email,
      name: userName,
      password
    };
    dispatch(userRegisterThunk(newUserData)).then(() => {
      setEmail('');
      setPassword('');
      setUserName('');
      navigate('/profile');
    });
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
