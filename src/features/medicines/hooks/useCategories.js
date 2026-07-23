import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const data = await getCategories();

                setCategories(data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "Failed to load categories",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
    };
}

export default useCategories;
