import React from 'react'
import './OnlineUsers.css'
import { useCollection } from './../../hooks/useCollection';
import { Avatar } from './../Avatar/Avatar';

export const OnlineUsers = () => {
    const { error, documents } = useCollection('users')
    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map((user) => (
                <div key={user.id} className='user-list-item'>
                    {user.isOnline ? <span className='online-user'></span>: <span className='offline-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div >
            ))}
        </div >
    )
}
