import React from 'react'
import './Header.css'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import Logout from '../Logout/Logout'
import { HasRole } from '../../Helpers/IsAuthenticated'

function Header() {
  return (
    <div className='header'>

      <ul className='nav-links'>
        <img className='logo' src={logo} alt="Logo" />

        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? 'link active' : 'link'
            }
          >
            Lista de Productos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/new-product"
            className={({ isActive }) =>
              isActive ? 'link active' : 'link'
            }
          >
            Agregar Producto
          </NavLink>
        </li>

        {HasRole("superAdmin") && (
          <li>
            <NavLink
              to="/users-list"
              className={({ isActive }) =>
                isActive ? 'link active' : 'link'
              }
            >
              Lista de Usuarios
            </NavLink>
          </li>
        )}


      </ul>

      <Logout />

    </div>
  )
}

export default Header