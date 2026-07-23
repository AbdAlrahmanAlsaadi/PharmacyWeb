import { useState } from "react";
import authService from "../services/authService";

function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.login(credentials);

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            localStorage.setItem("role", response.role);

            return response;
        } catch (error) {
            const message =
                error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";

            setError(message);

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
}

export default useLogin;
