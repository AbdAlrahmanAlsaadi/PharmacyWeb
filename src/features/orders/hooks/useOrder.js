import { useEffect, useState } from "react";
import { getOrder } from "../api/orderApi";

function useOrder(id) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchOrder = async () => {
            try {
                setLoading(true);

                const data = await getOrder(id);

                setOrder(data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load order.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

  return {
      orders,
      loading,
      error,
      fetchOrders,
  };
}

export default useOrder;
