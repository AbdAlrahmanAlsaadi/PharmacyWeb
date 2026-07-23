import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";

function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await getOrders();

            setOrders(response);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        setOrders,
        loading,
        error,
        fetchOrders,
    };
}

export default useOrders;
