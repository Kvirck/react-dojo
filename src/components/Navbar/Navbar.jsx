import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import Temple from '../../assets/temple.svg'
import './Navbar.css'
import { useLogout } from './../../hooks/useLogout';
import { useAuthContext } from './../../hooks/useAuthContext';

export const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt="dojo-logo" />
                    <span>The Dojo</span>
                </li>
                {!user ?
                    (<>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/sign-up'>SignUp</Link>
                        </li>
                    </>)
                    :
                    <li>
                        <button className='btn' onClick={handleLogout}>Logout</button>
                    </li>
                }

            </ul>
        </div>
    )
}
