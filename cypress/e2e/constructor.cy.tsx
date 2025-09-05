describe('Cypress тестирование на доступность страницы конструктора бургеров ', function() {
    it('Сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });
});

describe('Страница конструктора бургера', function(){
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('Загружается список ингредиентов', () => {
    cy.get('[data-test=burger-ingredient]').should('have.length.at.least', 5);
  });

  const ingredientsTypes = ['bun', 'main', 'sauce'];
  it('Тестируем добавление ингредиентов в конструктор', () => {
    cy.fixture('ingredients.json').its('data').as('ingredientsData');
    cy.get('[data-cy=make-order-button]').parents('section').as('constructorSection');

    ingredientsTypes.forEach((type) => {
      cy.get('@ingredientsData').then((ingredients) => {
        const ingredientToAdd = ingredients.find(ing => ing.type === type);

        cy.get('@constructorSection').should('not.contain', ingredientToAdd.name);
        if (type === 'bun') {
          cy.get('@constructorSection').contains('Выберите булки').should('exist');
        }
        cy.get(`[data-cy=${type}]`).find('button').first().click();
        cy.get('@constructorSection').should('contain', ingredientToAdd.name);
      });
    });
  });


  it('Открытие и закрытие модального окна по клику на крестик', () => {
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-testid=close_modal]').should('exist');
    cy.get('[data-testid=close_modal]').click(); 
    cy.get('[data-testid=close_modal]').should('not.exist');
  });

  it('Открытие и закрытие модального окна по клику на overlay', () => {
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-testid=close_modal_overlay]').should('exist');
    cy.get('[data-testid=close_modal_overlay]').click({ force: true });
    cy.get('[data-testid=close_modal_overlay]').should('not.exist');
  });

  it('Открытие и закрытие модального окна по клику на ESC', () => {
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-testid=close_modal_overlay]').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[data-testid=close_modal_overlay]').should('not.exist');
  });


  it('Проверка на невозможность создания заказа без ингредиентов', () => {
    // Нажатие кнопки заказа без добавления ингредиентов
    cy.get('button').contains('Оформить заказ').should('be.disabled');
    cy.get('[data-testid=close_modal_overlay]').should('not.exist');
  });

  it('Модалка отображает правильный ингредиент', () => {
    cy.get('[data-cy=ingredient-card]')
      .first()
      .click()
      .then(($card) => {
        const name = $card.find('[data-cy=ingredient-name]').text().trim();

        cy.get('[data-cy=modal-ingredient-name]')
          .should('be.visible')
          .and('contain', name);
      });
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  })


  it('Полный сценарий создание заказа', () => {
    cy.get('[data-cy=bun]').find('.common_button').first().click();
    cy.get('[data-cy=sauce]').find('.common_button').first().click();
    cy.get('[data-cy=main]').find('.common_button').first().click();
    cy.get('[data-cy=constructor-item]').should('exist');

    cy.get('[data-cy=make-order-button]').click();
    cy.wait('@createOrder');

    cy.get('[data-testid=modal-order-number]').should('contain', '87596');
    cy.get('[data-testid=close_modal]').should('exist');
    cy.get('[data-testid=close_modal]').click(); 
    cy.get('[data-testid=modal-order-number]').should('not.exist');
    cy.get('[data-cy=constructor-item]').should('not.exist');
  })

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
})
