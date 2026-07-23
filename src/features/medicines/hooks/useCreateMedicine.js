import { useState } from "react";
import { createMedicine } from "../api/medicineApi";

function useCreateMedicine() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addMedicine = async (medicineData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await createMedicine(medicineData);

            return response;
        } catch (error) {
            setError(error.response?.data?.message || "Failed to add medicine");

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        addMedicine,
        loading,
        error,
    };
}

export default useCreateMedicine;
