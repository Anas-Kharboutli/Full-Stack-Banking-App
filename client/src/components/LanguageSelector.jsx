import React, { useState } from 'react';
import i18n from '../i18n/i18n';
import '../styles/languageSelector.css';

const LanguageSelector = () => {

    const [ selectLanguage, setSelectLanguage ] = useState(i18n.language);

    const chooseLanguage = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);
        setSelectLanguage(e.target.value);
        localStorage.setItem("lang", e.target.value);
    }

  return (
    <div className='language-selector-container'>
        <select defaultValue={selectLanguage} onChange={chooseLanguage}>
            <option value='en'>
              ENG
            </option>
            <option value='pl'>
              PL
            </option>
        </select>
      
    </div>
  )
}

export default LanguageSelector
