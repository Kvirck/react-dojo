import { Routes, Route } from "react-router-dom"
import { Navbar, Sidebar } from "./components"
import { Dashboard, SignUp, Project, Create, Login } from './pages';

function App() {

  return (
    <div className="App">
      <Sidebar />
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create" element={<Create />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
