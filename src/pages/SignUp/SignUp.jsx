import React, { useState } from 'react';
import './SignUp.css'
import { useSignUp } from './../../hooks/useSignUp';
import { useNavigate } from 'react-router-dom';
export const SignUp = () => {
  const { signUp, isPending, error } = useSignUp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signUp(email, password, displayName, thumbnail)
    navigate('/')
  }

  const handleFileChange = e => {
    setThumbnail(null)
    let selected = e.target.files[0]
    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (!selected.size > 300000) {
      setThumbnailError('Image file sise must be less than 300kb')
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
  }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>sign up</h2>
      <label >
        <span>email</span>
        <input value={email} onChange={e => setEmail(e.target.value)} required type="text" />
      </label>
      <label >
        <span>password:</span>
        <input value={password} onChange={e => setPassword(e.target.value)} required type="password" />
      </label>
      <label >
        <span>display name</span>
        <input value={displayName} onChange={e => setDisplayName(e.target.value)} required type="text" />
      </label>
      <label >
        <span>Profile thumbnail</span>
        <input onChange={handleFileChange} required type="file" />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <button className='error'>{error}</button>}
    </form>
  )
}
