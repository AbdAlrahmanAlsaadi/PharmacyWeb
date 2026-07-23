import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function useLogout() {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await authService.logout();

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");

            navigate("/login", { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    return logout;
}

export default useLogout;
