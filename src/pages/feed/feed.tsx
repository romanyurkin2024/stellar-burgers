import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  isGetFeedRequest,
  orderFeedThunk,
  ordersSelector
} from '../../services/slices/orderFeedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelector);
  const isOrdersLoading: boolean = useSelector(isGetFeedRequest);
  const dispatch = useDispatch();
  const handleGetFeeds = () => {
    dispatch(orderFeedThunk());
  };

  useEffect(() => {
    dispatch(orderFeedThunk());
  }, [dispatch]);

  if (!orders.length || isOrdersLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
