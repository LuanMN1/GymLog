import React, { useState, useRef, useEffect } from 'react';
import './LanguageSelector.css';

const iconCheck = require('../assets/icons/icon-check.png');
const iconFlagUK = require('../assets/icons/icon-flag-uk.png');
const iconFlagBR = require('../assets/icons/icon-flag-br.png');
const iconFlagPT = require('../assets/icons/icon-flag-pt.png');

const LanguageSelector = ({ language, onChange, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: iconFlagUK },
    { code: 'pt-BR', name: 'Português (BR)', flag: iconFlagBR },
    { code: 'pt-PT', name: 'Português (PT)', flag: iconFlagPT }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

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

  const handleLanguageChange = (langCode) => {
    onChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container" ref={menuRef}>
      <button 
        className="language-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <img src={currentLanguage.flag} alt={currentLanguage.name} className="language-flag" />
        <span className="language-name">{currentLanguage.name}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-selector-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <img src={lang.flag} alt={lang.name} className="language-flag" />
              <span className="language-option-name">{lang.name}</span>
              {language === lang.code && (
                <img src={iconCheck} alt="Selected" className="language-check" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

