const bun = {
    _id: "bun-1",
    name: "Булка космическая",
    type: "bun",
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 50,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
};

const sauce = {
    _id: "sauce-1",
    name: "Соус фирменный",
    type: "sauce",
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 40,
    price: 20,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    __v: 0,
};

const mainIngredient = {
    _id: "main-1",
    name: "Котлета метеоритная",
    type: "main",
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 250,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
};

const ingredientsResponse = {
    success: true,
    data: [bun, sauce, mainIngredient],
};

const orderResponse = {
    success: true,
    name: "Test order",
    order: {
        number: 12345,
    },
};

const dropToConstructor = (ingredientName) => {
    const dataTransfer = new DataTransfer();

    cy.contains("[class*=BurgerIngredientCard_card]", ingredientName).trigger("dragstart", { dataTransfer });
    cy.get("[class*=BurgerConstructor_container]").trigger("drop", { dataTransfer });
    cy.get("[class*=BurgerConstructor_container]").trigger("dragend");
};

describe("Конструктор — пользовательский путь", () => {
    beforeEach(() => {
        cy.intercept("GET", "**/ingredients", {
            statusCode: 200,
            body: ingredientsResponse,
        }).as("getIngredients");

        cy.intercept("POST", "**/orders", {
            statusCode: 200,
            body: orderResponse,
        }).as("postOrder");

        cy.visit("http://localhost:3000", {
            onBeforeLoad(win) {
                win.localStorage.setItem("accessToken", "test-access");
                win.localStorage.setItem("refreshToken", "test-refresh");
            },
        });

        cy.wait("@getIngredients");
    });

    it("должен собрать бургер, оформить заказ и закрыть модалку", () => {
        // перетащили булку, соус и начинку
        dropToConstructor(bun.name);
        dropToConstructor(sauce.name);
        dropToConstructor(mainIngredient.name);

        // проверили, что ингредиенты появились в конструкторе и кнопка активна
        cy.contains("Булка космическая (верх)").should("exist");
        cy.contains(mainIngredient.name).should("exist");
        cy.contains("button", "Оформить заказ").should("not.be.disabled").click();

        // дождались заказа и проверили модалку
        cy.wait("@postOrder");
        cy.get("#react-modals").within(() => {
            cy.contains("идентификатор заказа").should("exist");
            cy.contains(orderResponse.order.number).should("exist");
        });

        // закрыли модалку по клику на оверлей
        cy.get("[class*=ModalOverlay_modal_overlay__CGcON]").click({ force: true });
        cy.get("#react-modals").should("be.empty");

        // после заказа конструктор очищен, кнопка снова неактивна
        cy.contains("Пока пусто").should("exist");
        cy.contains("button", "Оформить заказ").should("be.disabled");
    });
});
