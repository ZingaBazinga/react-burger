import reducer, {
    postPasswordReset,
    postPasswordResetReset,
    resetPasswordReset,
    resetPasswordResetReset,
    resetAuthRegister,
    initialState,
} from "./profileSlice";

describe("profileSlice reducer", () => {

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle resetPasswordReset", () => {
        const startState = {
            ...initialState,
            passwordResetSuccess: true,
            passwordResetRequest: true,
            passwordResetFailed: true,
        };
        expect(reducer(startState, resetPasswordReset())).toEqual(initialState);
    });

    it("should handle resetPasswordResetReset", () => {
        const startState = {
            ...initialState,
            passwordResetResetSuccess: true,
            passwordResetResetRequest: true,
            passwordResetResetFailed: true,
        };
        expect(reducer(startState, resetPasswordResetReset())).toEqual(initialState);
    });

    it("should handle resetAuthRegister", () => {
        const startState = {
            ...initialState,
            authRegisterSuccess: true,
            authRegisterRequest: true,
            authRegisterFailed: true,
        };
        expect(reducer(startState, resetAuthRegister())).toEqual(initialState);
    });

    describe("postPasswordReset thunk", () => {
        it("should handle pending", () => {
            const state = reducer(initialState, { type: postPasswordReset.pending.type });
            expect(state.passwordResetRequest).toBe(true);
            expect(state.passwordResetFailed).toBe(false);
        });

        it("should handle fulfilled", () => {
            const state = reducer(initialState, { type: postPasswordReset.fulfilled.type, payload: true });
            expect(state.passwordResetRequest).toBe(false);
            expect(state.passwordResetSuccess).toBe(true);
        });

        it("should handle rejected", () => {
            const state = reducer(initialState, { type: postPasswordReset.rejected.type });
            expect(state.passwordResetRequest).toBe(false);
            expect(state.passwordResetFailed).toBe(true);
        });
    });

    describe("postPasswordResetReset thunk", () => {
        it("should handle pending", () => {
            const state = reducer(initialState, { type: postPasswordResetReset.pending.type });
            expect(state.passwordResetRequest).toBe(true);
            expect(state.passwordResetFailed).toBe(false);
        });

        it("should handle fulfilled", () => {
            const state = reducer(initialState, { type: postPasswordResetReset.fulfilled.type, payload: true });
            expect(state.passwordResetRequest).toBe(false);
            expect(state.passwordResetSuccess).toBe(true);
        });

        it("should handle rejected", () => {
            const state = reducer(initialState, { type: postPasswordResetReset.rejected.type });
            expect(state.passwordResetRequest).toBe(false);
            expect(state.passwordResetFailed).toBe(true);
        });
    });
});
