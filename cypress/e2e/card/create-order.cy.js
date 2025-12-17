let bun;
let sauce;
let mainIngredient;
let orderResponse;

describe("Конструктор — пользовательский путь", () => {
    beforeEach(() => {
        cy.fixture("ingredients").then((ingredientsResponse) => {
            [bun, sauce, mainIngredient] = ingredientsResponse.data;
        });
        cy.fixture("order").then((fixtureOrderResponse) => {
            orderResponse = fixtureOrderResponse;
        });

        cy.intercept("GET", "**/ingredients", { fixture: "ingredients" }).as("getIngredients");
        cy.intercept("POST", "**/orders", { fixture: "order" }).as("postOrder");

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
