import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient.ts';
import LanguageSelector from './LanguageSelector.tsx';

const UserHeader: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    const confirm = window.confirm(t('auth.signOutConfirm'));
    if (confirm) {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="app-header">
      <div className="header-content">
        {user && (
          <div className="user-menu" ref={dropdownRef}>
            <button
              type="button"
              className="user-avatar-btn"
              onClick={toggleDropdown}
              aria-label="User menu"
            >
              👤
            </button>
            {isDropdownOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-name">
                  <strong>{user.name}</strong>
                </div>
                <div className="user-dropdown-section">
                  <LanguageSelector />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleSignOut}
                >
                  {t('auth.signOut')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
