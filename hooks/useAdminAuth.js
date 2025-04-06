import { useEffect } from "react";
import { useRouter } from "next/router";

const useAdminAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");

        if (!adminToken) {
            router.push("/login"); // Redirect to login if no token
        }
    }, []);
};

export default useAdminAuth;
