import reducer, {
    postAuthRegister,
    postAuthLogin,
    postAuthLogout,
    getAuthUser,
    patchAuthUser,
    resetAuthRegister,
    resetAuthLogin,
    resetAuthToken,
    resetAuthLogout,
    setUser,
    resetUser,
} from "./authSlice";
import { IProfileData } from "../entities/profile";

const makeUser = (overrides: Partial<IProfileData> = {}): IProfileData => ({
    email: "test@example.com",
    name: "Tester",
    ...overrides,
});

describe("authSlice reducer", () => {
    const initialState = {
        user: null as IProfileData | null,
        userRequest: false,
        userFailed: false,
        userSuccess: false,
        authRegisterSuccess: false,
        authRegisterRequest: false,
        authRegisterFailed: false,
        authLoginSuccess: false,
        authLoginRequest: false,
        authLoginFailed: false,
        authTokenSuccess: false,
        authTokenRequest: false,
        authTokenFailed: false,
        authLogoutSuccess: false,
        authLogoutRequest: false,
        authLogoutFailed: false,
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle setUser", () => {
        const user = makeUser({ name: "Alice" });
        const state = reducer(initialState, setUser(user));
        expect(state.user).toEqual(user);
    });

    it("should handle resetUser", () => {
        const user = makeUser();
        const startState = { ...initialState, user };
        const state = reducer(startState, resetUser());
        expect(state.user).toBeNull();
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

    it("should handle resetAuthLogin", () => {
        const startState = {
            ...initialState,
            authLoginSuccess: true,
            authLoginRequest: true,
            authLoginFailed: true,
        };
        expect(reducer(startState, resetAuthLogin())).toEqual(initialState);
    });

    it("should handle resetAuthToken", () => {
        const startState = {
            ...initialState,
            authTokenSuccess: true,
            authTokenRequest: true,
            authTokenFailed: true,
        };
        expect(reducer(startState, resetAuthToken())).toEqual(initialState);
    });

    it("should handle resetAuthLogout", () => {
        const startState = {
            ...initialState,
            authLogoutSuccess: true,
            authLogoutRequest: true,
            authLogoutFailed: true,
        };
        expect(reducer(startState, resetAuthLogout())).toEqual(initialState);
    });

    describe("postAuthRegister thunk", () => {
        it("should handle pending", () => {
            const state = reducer(initialState, { type: postAuthRegister.pending.type });
            expect(state.authRegisterRequest).toBe(true);
            expect(state.authRegisterSuccess).toBe(false);
            expect(state.authRegisterFailed).toBe(false);
        });

        it("should handle fulfilled", () => {
            const user = makeUser({ name: "Bob" });
            const state = reducer(initialState, { type: postAuthRegister.fulfilled.type, payload: user });
            expect(state.authRegisterRequest).toBe(false);
            expect(state.authRegisterSuccess).toBe(true);
            expect(state.authRegisterFailed).toBe(false);
            expect(state.user).toEqual(user);
        });

        it("should handle rejected", () => {
            const state = reducer(initialState, { type: postAuthRegister.rejected.type });
            expect(state.authRegisterRequest).toBe(false);
            expect(state.authRegisterSuccess).toBe(false);
            expect(state.authRegisterFailed).toBe(true);
        });
    });

    describe("postAuthLogin thunk", () => {
        it("should handle pending", () => {
            const state = reducer(initialState, { type: postAuthLogin.pending.type });
            expect(state.authLoginRequest).toBe(true);
            expect(state.authLoginSuccess).toBe(false);
            expect(state.authLoginFailed).toBe(false);
        });

        it("should handle fulfilled", () => {
            const user = makeUser({ email: "login@example.com" });
            const state = reducer(initialState, { type: postAuthLogin.fulfilled.type, payload: user });
            expect(state.authLoginRequest).toBe(false);
            expect(state.authLoginSuccess).toBe(true);
            expect(state.authLoginFailed).toBe(false);
            expect(state.user).toEqual(user);
        });

        it("should handle rejected", () => {
            const state = reducer(initialState, { type: postAuthLogin.rejected.type });
            expect(state.authLoginRequest).toBe(false);
            expect(state.authLoginSuccess).toBe(false);
            expect(state.authLoginFailed).toBe(true);
        });
    });

    describe("postAuthLogout thunk", () => {
        it("should handle pending", () => {
            const state = reducer(initialState, { type: postAuthLogout.pending.type });
            expect(state.authLogoutRequest).toBe(true);
            expect(state.authLogoutSuccess).toBe(false);
            expect(state.authLogoutFailed).toBe(false);
        });

        it("should handle fulfilled", () => {
            const state = reducer(initialState, { type: postAuthLogout.fulfilled.type, payload: true });
            expect(state.authLogoutRequest).toBe(false);
            expect(state.authLogoutSuccess).toBe(true);
            expect(state.authLogoutFailed).toBe(false);
        });

        it("should handle rejected", () => {
            const state = reducer(initialState, { type: postAuthLogout.rejected.type });
            expect(state.authLogoutRequest).toBe(false);
            expect(state.authLogoutSuccess).toBe(false);
            expect(state.authLogoutFailed).toBe(true);
        });
    });

    describe("getAuthUser thunk", () => {
        it("should handle pending", () => {
            const state = reducer(initialState, { type: getAuthUser.pending.type });
            expect(state.userRequest).toBe(true);
            expect(state.userFailed).toBe(false);
            expect(state.userSuccess).toBe(false);
        });

        it("should handle fulfilled", () => {
            const user = makeUser({ name: "Fetched" });
            const state = reducer(initialState, { type: getAuthUser.fulfilled.type, payload: user });
            expect(state.userRequest).toBe(false);
            expect(state.userFailed).toBe(false);
            expect(state.userSuccess).toBe(true);
            expect(state.user).toEqual(user);
        });

        it("should handle rejected", () => {
            const state = reducer(initialState, { type: getAuthUser.rejected.type });
            expect(state.userRequest).toBe(false);
            expect(state.userFailed).toBe(true);
            expect(state.userSuccess).toBe(false);
        });
    });

    describe("patchAuthUser thunk", () => {
        it("should handle fulfilled", () => {
            const user = makeUser({ name: "Updated" });
            const state = reducer(initialState, { type: patchAuthUser.fulfilled.type, payload: user });
            expect(state.user).toEqual(user);
        });
    });
});
