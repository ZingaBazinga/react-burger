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

describe("Конструктор — модальное окно ингредиента", () => {
    beforeEach(() => {
        cy.intercept("GET", "**/ingredients", {
            statusCode: 200,
            body: ingredientsResponse,
        }).as("getIngredients");

        cy.visit("/");
        cy.wait("@getIngredients");
    });

    it("должен открыть модальное окно с описанием ингредиента при клике на карточку", () => {
        cy.clickIngredientCard(bun.name);

        cy.getModal().should("not.be.empty");
        cy.contains("Детали ингредиента").should("exist");
    });

    it("должен отобразить данные ингредиента в модальном окне", () => {
        cy.clickIngredientCard(sauce.name);

        cy.getModal().within(() => {
            cy.contains(sauce.name).should("exist");
            cy.contains("Калории,ккал").should("exist");
            cy.contains(sauce.calories).should("exist");
            cy.contains("Белки, г").should("exist");
            cy.contains(sauce.proteins).should("exist");
            cy.contains("Жиры, г").should("exist");
            cy.contains(sauce.fat).should("exist");
            cy.contains("Углеводы, г").should("exist");
            cy.contains(sauce.carbohydrates).should("exist");
            cy.get("img[src='" + sauce.image_large + "']").should("exist");
        });
    });

    it("должен закрыть модальное окно при клике на кнопку закрытия", () => {
        cy.clickIngredientCard(mainIngredient.name);
        cy.getModal().as("modal").should("not.be.empty");
        cy.closeModalByButton();
        cy.get("@modal").should("be.empty");
    });

    it("должен закрыть модальное окно при клике на оверлей", () => {
        cy.clickIngredientCard(bun.name);
        cy.getModal().as("modal").should("not.be.empty");
        cy.closeModalByOverlay();
        cy.get("@modal").should("be.empty");
    });
});
