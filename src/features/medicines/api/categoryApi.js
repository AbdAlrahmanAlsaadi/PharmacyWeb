import api from "@/services/api";

export const getCategories = async () => {
    const response = await api.get("/categories");

    return response.data.data;
};
