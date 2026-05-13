import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../api/models/auth';
import { ROUTES } from '../../config/routes';


const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate(ROUTES.PROJECTS);
    } catch (error) { alert("Logging error"); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
