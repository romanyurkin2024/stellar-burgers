import {
  mockConstructorIngredient,
  mockIngredient
} from '../__mocks__/mockData';
import constructorReducer, {
  addIngredient,
  BurgerConstructorSliceType,
  constructorInitialState,
  deleteIngredient,
  toDownIngredient,
  toUpIngredient
} from '../burgerConstructorSlice';

describe('Тестируем burgerConstructorSlice:', () => {
  let stateAfterAdd: BurgerConstructorSliceType;

  beforeEach(() => {
    stateAfterAdd = constructorReducer(
      constructorInitialState,
      addIngredient(mockIngredient)
    );
  });

  test('Тестируем начальное состояние: ', () => {
    expect(constructorReducer(undefined, { type: 'test' })).toEqual(
      constructorInitialState
    );
  });

  test('Тестирование добавления ингредиента в конструктор:', () => {
    expect(stateAfterAdd.ingredients.length).toBe(1);
    expect(stateAfterAdd.ingredients[0]).toHaveProperty('id');
    expect(stateAfterAdd.ingredients[0].name).toBe('Test Ingredient');
  });

  test('Тестирование удаления ингредиента в конструктор:', () => {
    expect(stateAfterAdd.ingredients.length).toBe(1);
    const addedIngredient = stateAfterAdd.ingredients[0];
    expect(addedIngredient).toBeDefined();

    const stateAfterDelete = constructorReducer(
      stateAfterAdd,
      deleteIngredient(addedIngredient.id)
    );
    expect(stateAfterDelete.ingredients.length).toBe(0);
  });

  test('Проверка изменения позиции ингредиента', () => {
    const mockIngredientA = { ...mockIngredient, name: 'A' };
    const mockIngredientB = { ...mockIngredient, name: 'B' };

    const stateAfterA = constructorReducer(
      constructorInitialState,
      addIngredient(mockIngredientA)
    );

    const stateAfterB = constructorReducer(
      stateAfterA,
      addIngredient(mockIngredientB)
    );

    const stateAfterMove = constructorReducer(stateAfterB, toUpIngredient(1));
    expect(stateAfterMove.ingredients[0].name).toBe('B');
    expect(stateAfterMove.ingredients[1].name).toBe('A');

    const finalState = constructorReducer(stateAfterMove, toDownIngredient(0));
    expect(finalState.ingredients[0].name).toBe('A');
    expect(finalState.ingredients[1].name).toBe('B');
  });
});
