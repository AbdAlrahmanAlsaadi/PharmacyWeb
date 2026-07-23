import api from "@/services/api";

const login = async (credentials) => {
  const response = await api.post("/login", credentials);

  return response.data;
};
export const logout = async () => {
    const response = await api.post("/logout");
    return response.data;
};const authService = {
    login,
    logout,
};

export default authService;
