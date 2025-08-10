import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  feedOrderSelector,
  orderDetailsThunk
} from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';
import { isOrderRequest } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const isOrderLoading = useSelector(isOrderRequest);

  useEffect(() => {
    dispatch(orderDetailsThunk(Number(number)));
  }, [dispatch, number]);

  const orderData = useSelector(feedOrderSelector);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || isOrderLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
