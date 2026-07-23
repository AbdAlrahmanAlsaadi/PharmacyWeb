import { useEffect, useState } from "react";
import { getMedicines, searchMedicines } from "../api/medicineApi";

function useMedicines(categoryId = "", search = "") {
    const [medicines, setMedicines] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            setError(null);

            let response;

            // إذا يوجد نص بحث
            if (search.trim() !== "") {
                response = await searchMedicines(search);
            }
            // إذا اختار كاتيجوري فقط
            else if (categoryId !== "") {
                response = await getMedicines(categoryId);
            }
            // أول دخول للصفحة
            else {
                response = await getMedicines();
            }

            setMedicines(response.data);
            setCount(response.count);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load medicines");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, [categoryId, search]);

    return {
        medicines,
        count,
        loading,
        error,
        fetchMedicines,
    };
}

export default useMedicines;
