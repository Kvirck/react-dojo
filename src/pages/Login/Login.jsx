import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './../../hooks/useLogin';
import './Login.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>Login</h2>
      <label >
        <span>email</span>
        <input value={email} onChange={e => setEmail(e.target.value)} required type="text" />
      </label>
      <label >
        <span>password:</span>
        <input value={password} onChange={e => setPassword(e.target.value)} required type="password" />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <button className='error'>{error}</button>}
    </form>
  )
}
