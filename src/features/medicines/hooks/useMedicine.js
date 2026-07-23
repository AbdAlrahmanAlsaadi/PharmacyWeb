import { useEffect, useState } from "react";
import { getMedicineById } from "../api/medicineApi";

function useMedicine(id) {
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchMedicine = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getMedicineById(id);

                setMedicine(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load medicine",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMedicine();
    }, [id]);

    return {
        medicine,
        loading,
        error,
    };
}

export default useMedicine;
