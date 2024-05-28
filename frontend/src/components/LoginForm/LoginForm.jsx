import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";


export const LoginForm = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const LoginFunc = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5005/users/login', {
            username: username,
            password: password
          });
        console.log(response);
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
  }

  return (
    <div className='wrapper'>
        <form form onSubmit={LoginFunc} className="card p-4">
            {/* <img className="logo" src='https://hariff.co.id/image/Logo.png' alt='tidak ada'></img> */}
            <h1>Login</h1>
            <div className='input-box'>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder='Password' required/>
                <FaLock className='icon'/>
            </div>

            <button type='submit'>Login</button>

        </form>
    </div>
  )
}

export default LoginForm;