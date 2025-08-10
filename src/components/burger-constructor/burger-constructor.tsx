import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  isOrderRequest,
  orderBurgerThunk,
  orderSelector
} from '../../services/slices/orderSlice';
import { deleteAllIngredients } from '../../services/slices/burgerConstructorSlice';
import {
  checkUserAuthThunk,
  isAuthSelector
} from '../../services/slices/userProfileSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector(isOrderRequest);
  const orderModalData = useSelector(orderSelector);
  const isAuthChecked = useSelector(isAuthSelector);

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, []);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthChecked) {
      navigate('/login', { state: { backgroundLocation: location } });
      return;
    }
    const { bun, ingredients } = constructorItems;
    dispatch(
      orderBurgerThunk([
        bun._id,
        ...ingredients.map((ingredient) => ingredient._id),
        bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(deleteAllIngredients());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
