import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ className = '', showLabel = true, compact = false }) => {
    const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    if (compact) {
        return (
            <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className={`p-1 rounded text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                aria-label="Select Language"
            >
                {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.nativeName}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showLabel && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Globe size={16} />
                    <span>Language:</span>
                </div>
            )}
            <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Select Language"
            >
                {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;