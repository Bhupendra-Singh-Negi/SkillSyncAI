import React, { useState } from 'react'
import "../auth.scss"
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
const Register = () => {
  const navigate=useNavigate()
  const {loading, handleRegister}= useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit=async (e)=>{
        e.preventDefault();
        await handleRegister({username, email, password})
        navigate('/login')
    }
    
    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
    
  return (
     <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)} 
                    type="text" id="username" name="username" required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password" id="password" name="password" required />
                </div>
                <button className="button primary-button">Register</button>
                
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register