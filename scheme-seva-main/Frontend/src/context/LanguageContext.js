import React, { createContext, useContext, useState, useEffect } from 'react';

// Supported languages list
const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెলుগు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமিழ்' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
    { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
    { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر' }
];

// Create Language Context
const LanguageContext = createContext();

// Custom hook to use language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
    // Get language from localStorage or default to 'en'
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('preferred-language');
        return savedLanguage && SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage) 
            ? savedLanguage 
            : 'en';
    });

    // Update localStorage when language changes
    useEffect(() => {
        localStorage.setItem('preferred-language', currentLanguage);
    }, [currentLanguage]);

    // Change language function
    const changeLanguage = (languageCode) => {
        if (SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode)) {
            setCurrentLanguage(languageCode);
        } else {
            console.warn(`Language code '${languageCode}' is not supported`);
        }
    };

    // Get current language details
    const getCurrentLanguage = () => {
        return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
    };

    // Context value
    const contextValue = {
        currentLanguage,
        changeLanguage,
        getCurrentLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isLanguageSupported: (code) => SUPPORTED_LANGUAGES.some(lang => lang.code === code)
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;