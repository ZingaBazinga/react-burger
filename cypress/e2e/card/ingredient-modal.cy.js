let bun;
let sauce;
let mainIngredient;

describe("Конструктор — модальное окно ингредиента", () => {
    beforeEach(() => {
        cy.fixture("ingredients").then((ingredientsResponse) => {
            [bun, sauce, mainIngredient] = ingredientsResponse.data;
        });

        cy.intercept("GET", "**/ingredients", { fixture: "ingredients" }).as("getIngredients");

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
