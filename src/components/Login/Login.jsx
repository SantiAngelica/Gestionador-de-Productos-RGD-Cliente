import { useState } from "react";
import "./Login.css";
import { isAuthenticated } from "../../Helpers/IsAuthenticated";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if(isAuthenticated()){
        window.location.href = "/home";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5229/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Credenciales inválidas");
            }

            const token = await response.text();
            const expiresAt = Date.now() + 720 * 60 * 1000; 
            localStorage.setItem("token", token);
            localStorage.setItem("token_expires_at", expiresAt.toString());

            // redirigí a tu dashboard
            window.location.href = "/home";
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="login-card">
            <h1>Stock Manager</h1>
            <p className="subtitle">Iniciar sesión</p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="User"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? "Ingresando..." : "Entrar"}
                </button>
            </form>

            <span className="footer">© 2026 · RGD</span>
        </div>

    );
}
