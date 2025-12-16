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

        cy.visit("/", {
            onBeforeLoad(win) {
                win.localStorage.setItem("accessToken", "test-access");
                win.localStorage.setItem("refreshToken", "test-refresh");
            },
        });

        cy.wait("@getIngredients");
    });

    it("должен собрать бургер, оформить заказ и закрыть модалку", () => {
        cy.dragIngredientToConstructor(bun.name);
        cy.dragIngredientToConstructor(sauce.name);
        cy.dragIngredientToConstructor(mainIngredient.name);

        cy.contains("Булка космическая (верх)").should("exist");
        cy.contains(mainIngredient.name).should("exist");
        cy.contains("button", "Оформить заказ").should("not.be.disabled").click();

        cy.wait("@postOrder");
        cy.getModal().within(() => {
            cy.contains("идентификатор заказа").should("exist");
            cy.contains(orderResponse.order.number).should("exist");
        });

        cy.closeModalByOverlay();
        cy.getModal().should("be.empty");

        cy.contains("Пока пусто").should("exist");
        cy.contains("button", "Оформить заказ").should("be.disabled");
    });
});
