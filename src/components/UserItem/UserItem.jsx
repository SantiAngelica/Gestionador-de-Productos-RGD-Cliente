import "./UserItem.css";

function UserItem({ user, onDelete }) {
    return (
        <div className="user-item mt-4">
            <div className="user-data">
                <span className="user-name">{user.userName}</span>
                <span className={`user-role `}>
                    {user.role}
                </span>
            </div>
            {user.role == "admin" &&
                <button
                    className="delete-btn"
                    onClick={() => onDelete(user.id)}
                >
                    Eliminar
                </button>
            }
        </div>
    );
}

export default UserItem;
