import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersThunk,
  isGetFeedRequest,
  ordersSelector
} from '../../services/slices/orderFeedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelector);
  const isOrdersLoading: boolean = useSelector(isGetFeedRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (isOrdersLoading) {
    <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
