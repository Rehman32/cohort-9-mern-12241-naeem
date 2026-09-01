import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="profile-layout">
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {getInitial(user?.username)}
          </div>
          <h1 className="profile-name">{user?.username}</h1>
          <p className="profile-email">{user?.email}</p>

          <div className="profile-info-section">
            <div className="profile-info-row">
              <span className="profile-info-label">Username</span>
              <span className="profile-info-value">{user?.username}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-label">Email</span>
              <span className="profile-info-value">{user?.email}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-label">User ID</span>
              <span className="profile-info-value profile-id">{user?.id}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-back" onClick={() => navigate('/dashboard')}>
              ← Back to Dashboard
            </button>
            <button className="btn-logout-profile" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
