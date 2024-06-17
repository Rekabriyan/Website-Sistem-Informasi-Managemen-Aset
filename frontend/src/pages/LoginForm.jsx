import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5005/users/login`, formData, { validateStatus: false }); 
      if (response.status === 200) {
        console.log(response.data);
        Cookies.set('username', response.data.username, { expires: 1 });
        Cookies.set('role', response.data.role, { expires: 1 }); 

        navigate('/report');

      } else if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: response.data.error,
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: response.data.error,
        });
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.'); 
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src="assets\logoHariff.png" alt="Hariff" style={{ width: '100px', height: 'auto' }} />
            <h1 className="h4 text-gray-900 mt-3 font-weight-bold">Login Page</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                name="username" 
                id="username" 
                placeholder="Masukkan Username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password" 
                placeholder="Masukkan Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <Link className="small" to="/register">Klik disini untuk registrasi!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
