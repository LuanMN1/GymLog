import React, { useState, useRef, useEffect } from 'react';
import './UserMenu.css';

const iconUser = require('../assets/icons/icon-user.png');
const iconSettings = require('../assets/icons/icon-settings.png');
const iconLogout = require('../assets/icons/icon-logout.png');

const UserMenu = ({ user, isGuest, onLogout, onOpenSettings, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getInitials = (email) => {
    if (!email) return 'GU';
    const parts = email.split('@')[0];
    return parts.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (isGuest) return t('auth.guestMode');
    if (user?.username) {
      return user.username;
    }
    if (user?.email) {
      return user.email.split('@')[0]; // Mostra apenas a parte antes do @
    }
    return 'User';
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <div className="user-avatar">
          {isGuest ? (
            <img src={iconUser} alt="User" className="avatar-icon" />
          ) : user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="avatar-image" />
          ) : (
            <span className="avatar-initials">{getInitials(user?.username || user?.email)}</span>
          )}
        </div>
        <div className="user-info-text">
          <span className="user-name">{getUserDisplayName()}</span>
          {!isGuest && user?.email && (
            <span className="user-email-small">{user.email}</span>
          )}
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-avatar">
              {isGuest ? (
                <img src={iconUser} alt="User" className="avatar-icon-large" />
              ) : user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="avatar-image-large" />
              ) : (
                <span className="avatar-initials-large">{getInitials(user?.username || user?.email)}</span>
              )}
            </div>
            <div className="dropdown-user-info">
              <div className="dropdown-user-name">{getUserDisplayName()}</div>
              {!isGuest && user?.email && (
                <div className="dropdown-user-email">{user.email}</div>
              )}
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-menu-items">
            {!isGuest && (
              <button 
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  onOpenSettings();
                }}
              >
                <img src={iconSettings} alt="Settings" className="dropdown-icon" />
                <span>{t('userMenu.settings')}</span>
              </button>
            )}
            
            <button 
              className="dropdown-item"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
            >
              <img src={iconLogout} alt="Logout" className="dropdown-icon" />
              <span>{t('auth.logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

