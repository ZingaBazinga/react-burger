export function useAuth() {
    const accessToken = localStorage.getItem("accessToken");

    return {
        isAuth: !!accessToken,
    };
}
