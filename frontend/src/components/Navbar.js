import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const history = useNavigate();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <h2>Event Management System</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li>{user.username}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {user?.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
