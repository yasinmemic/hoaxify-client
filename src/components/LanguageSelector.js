import React from 'react';
import { changeLanguage } from '../api/apiCalls'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () =>{

 const { i18n } = useTranslation();;

   const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
  
        return (
            <div className="container">
                <img src="https://www.countryflags.io/tr/flat/24.png" alt="TR" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }} />
                <img src="https://www.countryflags.io/us/flat/24.png" alt="EN" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }} />
            </div>

        );
}

export default LanguageSelector;