import React, { useState } from 'react';
import i18n from '../i18n/i18n';

const LanguageSelector = () => {

    const [ selectLanguage, setSelectLanguage ] = useState(i18n.language);

    const chooseLanguage = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);
        setSelectLanguage(e.target.value);
        localStorage.setItem("lang", e.target.value);
    }

  return (
    <div>
        <select defaultValue={selectLanguage} onChange={chooseLanguage}>
            <option value='en'>Englisg</option>
            <option value='pl'>Polish</option>
        </select>
      
    </div>
  )
}

export default LanguageSelector
