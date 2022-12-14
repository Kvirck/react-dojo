import React from 'react'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import AddIcon from '../../assets/add_icon.svg'
import './Sidebar.css'
import { Avatar } from '../Avatar/Avatar'
import { useAuthContext } from './../../hooks/useAuthContext';

export const Sidebar = () => {
  const { user } = useAuthContext()
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={DashboardIcon} alt="" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>

        </nav>
      </div>
    </div>
  )
}
