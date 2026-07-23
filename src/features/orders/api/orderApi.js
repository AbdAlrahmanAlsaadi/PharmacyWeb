import api from "@/services/api";

export const getOrders = async () => {
    const response = await api.get("/orders");

    return response.data;
};

export const getOrder = async (id) => {
    const response = await api.get(`/orders/${id}`);

    return response.data.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await api.post(`/updateStatus/${id}`, {
        status,
    });

    return response.data;
};

export const downloadReport = async (start_date, end_date) => {
    const response = await api.post(
        "/get",
        {
            start_date,
            end_date,
        },
        {
            responseType: "blob",
        },
    );

    return response.data;
};