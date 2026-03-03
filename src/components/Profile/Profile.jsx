import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import toast, { Toaster } from 'react-hot-toast'
import './Profile.css'

function Profile() {
    const [formData, setFormData] = useState({
        userName: "",
        role: ""
    })
    const [isEditingName, setIsEditingName] = useState(false);
    const [error, setError] = useState("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: ""
    })
    useEffect(() => {
        fetch(`${API_BASE_URL}/user/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setFormData({
                    userName: data.userName,
                    role: data.role
                })
            })
    }, [])
    const handleChangeName = (e) => {
        e.preventDefault();
        setIsEditingName(true);
    };
    const handleSaveName = async (e) => {
        e.preventDefault();
        if (formData.userName.trim() === "") {
            setError("Nombre de usuario necesario")
            return;
        }
        const saveName = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/user/change-name?Name=${formData.userName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (!response.ok) throw new Error("Error al actualizar");
            setError("")
            setIsEditingName(false);
        }
        try {
            await toast.promise(
                saveName(),
                {
                    loading: 'Guardando nombre...',
                    success: 'Nombre cambiado con éxito',
                    error: (err) => err.message || 'Error al cambiar el nombre del usuario'
                })
        } catch (error) {

        }
    };

    const handleChangePasswords = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        })
    };

    const handleSavePassword = async (e) => {
        e.preventDefault();
        if (passwordData.currentPassword.trim() === "" || passwordData.newPassword.trim() === "") {
            setError("Ambos campos son necesarios")
            return;
        }
        if (passwordData.newPassword == passwordData.currentPassword) {
            setError("La nueva contraseña no puede ser igual a la actual")
            return;
        }
        const savePassword = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/user/change-password?OldPassword=${passwordData.currentPassword}&newPassword=${passwordData.newPassword}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await response.json(); // 👈 parseamos SIEMPRE

            if (!response.ok) {
                throw data; // 👈 tiramos el objeto completo
            }
            setError("")
            setIsEditingPassword(false);

        }
        console.log(" vamooooo")
        try {
            await toast.promise(
                savePassword(),
                {
                    loading: 'Guardando contraseña...',
                    success: 'Contraseña cambiada con éxito',
                    error: (err) => err?.detail || "Error al cambiar la contraseña"
                })
            setPasswordData({
                currentPassword: "",
                newPassword: ""
            })
        } catch (error) {
            console.log(error.detail)
        }
    }


    return (
        <div className="profile-container container mt-5">
            <h2>Perfil de Usuario</h2>

            <form className="profile-form" >

                <label>
                    Nombre
                    <div className="input-box d-flex flex-row align-items-center">

                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            disabled={!isEditingName}
                            onChange={(e) =>
                                setFormData({ ...formData, userName: e.target.value })
                            }
                        />
                        {!isEditingName ? (
                            <button
                                className='m-0 mx-2 change-button'
                                type='button'
                                onClick={handleChangeName}
                            >
                                Cambiar nombre
                            </button>
                        ) : (
                            <button
                                className='m-0 mx-2 change-button save-button'
                                type='button'
                                onClick={handleSaveName}
                            >
                                Guardar
                            </button>
                        )}

                        {!isEditingPassword ? (
                            <button className='m-0  mx-2 change-button' type='button' onClick={() => setIsEditingPassword(true)}>Cambiar contraseña</button>
                        ) : (
                            <button className='m-0  mx-2 change-button save-button' type='button' onClick={handleSavePassword}>Guardar</button>
                        )}

                    </div>
                </label>
                {isEditingPassword && (
                    <div>
                        <label>Contraseña actual</label>
                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handleChangePasswords} />
                        <label>Nueva contraseña</label>
                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChangePasswords} />
                    </div>
                )}
                <label>
                    Rol
                    <input
                        type="text"
                        value={formData.role}
                        disabled
                    />
                </label>
                {error && <div className="error">{error}</div>}

            </form>
            <Toaster position="bottom-right" reverseOrder={false}
                toastOptions={{
                    className: 'custom-toast'
                }} />
        </div>
    )
}

export default Profile