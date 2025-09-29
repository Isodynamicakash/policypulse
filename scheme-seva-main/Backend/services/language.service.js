class LanguageService {
    constructor() {
        // Static list of supported Indian languages
        this.supportedLanguages = [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
            { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
            { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
            { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
            { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
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
    }

    /**
     * Get all supported languages
     * @returns {Object} - Object containing array of supported languages
     */
    getSupportedLanguages() {
        return {
            languages: this.supportedLanguages
        };
    }

    /**
     * Validate if a language code is supported
     * @param {string} languageCode - Language code to validate
     * @returns {boolean} - True if language is supported
     */
    isLanguageSupported(languageCode) {
        return this.supportedLanguages.some(lang => lang.code === languageCode);
    }

    /**
     * Get language details by code
     * @param {string} languageCode - Language code
     * @returns {Object|null} - Language object or null if not found
     */
    getLanguageByCode(languageCode) {
        return this.supportedLanguages.find(lang => lang.code === languageCode) || null;
    }

    /**
     * Health check for Language service
     * @returns {Object} - Service health status
     */
    healthCheck() {
        return {
            status: 'healthy',
            message: 'Language service is operational',
            supportedLanguagesCount: this.supportedLanguages.length,
            apiConfigured: false, // No external API dependency
            fallbackEnabled: false // No fallback needed
        };
    }
}

export default new LanguageService();