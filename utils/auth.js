import { parseCookies } from "nookies";

export const authenticateAdmin = (ctx) => {
    const cookies = parseCookies(ctx);
    
    // Assuming you store an admin token or role in cookies
    if (!cookies.token || cookies.role !== "admin") {
        return {
            redirect: {
                destination: "/login", // Redirect to login page if not admin
                permanent: false,
            },
        };
    }
    
    return { props: {} }; // Allow access
};
