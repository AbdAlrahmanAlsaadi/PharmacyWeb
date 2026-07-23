import api from "@/services/api";

export const createMedicine = async (medicineData) => {
    const formData = new FormData();

    formData.append("scientific_name", medicineData.scientific_name);

    formData.append("commercial_name", medicineData.commercial_name);

    formData.append("category_id", medicineData.category_id);

    formData.append("manufacturer", medicineData.manufacturer);

    formData.append("quantity", medicineData.quantity);

    formData.append("price", medicineData.price);

    formData.append("expiry_date", medicineData.expiry_date);

    const response = await api.post("/store", formData);

    return response.data;
};

export const getMedicines = async (categoryId = "") => {
    const response = await api.get("/ss", {
        params: categoryId
            ? {
                  category_id: categoryId,
              }
            : {},
    });

    return response.data;
};

export const searchMedicines = async (name) => {
    const response = await api.get("/byName", {
        params: {
            commercial_name: name,
        },
    });

    return response.data;
};
export const getMedicineById = async (id) => {
    const response = await api.get(`/show/${id}`);
    return response.data;
};