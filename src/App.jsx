import React from "react"
import { Navbar, Sidebar } from './components/index'
import { SignUp, DashBoard, Login, Project, Create } from './pages/index'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"
import { OnlineUsers } from "./components/OnlineUsers/OnlineUsers"
function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (<>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <DashBoard /> : <Navigate to="/sign-up" replace />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/sign-up" element={user ? <Navigate to="/" replace /> : <SignUp />} />
            <Route path="/create" element={user ? <Create /> : <Navigate to="/sign-up" replace />} />
            <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/sign-up" replace />} />
          </Routes>
        </div>
        {user && <OnlineUsers />}
      </>)}
    </div>
  )
}

export default App
