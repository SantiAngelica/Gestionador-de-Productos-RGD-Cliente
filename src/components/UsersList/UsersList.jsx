import React, { useEffect, useState } from 'react'
import { HasRole } from '../../Helpers/IsAuthenticated'
import { API_BASE_URL } from '../../config/api';
import UserItem from '../UserItem/UserItem';
import { FaPlus } from "react-icons/fa6";
import './UsersList.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


function UsersList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }
        fetchUsers()
    }, [])

    const onDelete = async (userId) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "No podras revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    if (response.ok) {
                        setUsers(users.filter(user => user.id !== userId))
                    } else {
                        console.error("Error deleting user")
                    }
                } catch (error) {
                    console.error("Error deleting user:", error)
                }
            }
        })
    }

    return (
        <div className='user-container'>
            <div className="user-head d-flex justify-content-between align-items-center text-center my-4">
                <h3 className='tittle'>Lista de usuarios</h3>
                <button className='add-user-button' onClick={() => navigate('/new-user')}>
                    Añadir Usuario <FaPlus />
                </button>
            </div>
            <hr />
            {users.map(user => (
                <UserItem key={user.id} user={user} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default UsersList