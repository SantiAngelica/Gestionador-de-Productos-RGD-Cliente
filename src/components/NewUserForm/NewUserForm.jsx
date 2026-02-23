import { useState } from "react";
import "./NewUserForm.css";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

function NewUserForm() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",

    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createUser = async () => {
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
    
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || data)
            }
            return data
        }
        try {
            await toast.promise(
                createUser(),
                {
                    loading: 'Guardando usuario...',
                    success: 'Usuario agregado con éxito',
                    error: (err) => err.message || 'Error al agregar el usuario'
                }
            )

            setFormData({
                username: '',
                password: '',
            })
             setTimeout(() => { navigate("/users-list") }, 1000)

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="form-container container mt-5">
            <h2>Nuevo Usuario</h2>

            <form className="product-form" onSubmit={handleSubmit}>

                <label>
                    Nombre
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Contraseña
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Rol
                    <input
                        type="text"
                        value="Admin"
                        disabled
                    />
                </label>
                {error && <div className="error">{error}</div>}

                <button type="submit">
                    Crear Usuario
                </button>

            </form>
            <Toaster position="bottom-right" reverseOrder={false}
                toastOptions={{
                    className: 'custom-toast'
                }} />
        </div>
    );
}

export default NewUserForm;
