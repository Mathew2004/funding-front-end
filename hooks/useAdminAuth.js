import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const useAdminAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");

        if (!adminToken) {
            router.push("/login");
            return;
        }

        try {
            const decoded = jwtDecode(adminToken);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                localStorage.removeItem("adminToken");
                router.push("/login");
            }
        } catch (error) {
            localStorage.removeItem("adminToken");
            router.push("/login");
        }
    }, []);
};

export default useAdminAuth;
