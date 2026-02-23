import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
    const token = localStorage.getItem("token");
    const expires = localStorage.getItem("token_expires_at");

    if (!token || !expires) return false;

    if (Date.now() > Number(expires)) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expires");
        return false;
    }

    return true;
}

export function HasRole(role) {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decoded = jwtDecode(token);

    const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return userRole === role;
}