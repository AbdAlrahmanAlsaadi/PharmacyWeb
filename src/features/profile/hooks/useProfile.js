import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";

function useProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load profile",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        error,
    };
}

export default useProfile;
