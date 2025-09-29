import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class BhashiniService {
    constructor() {
        this.apiKey = process.env.BHASHINI_API_KEY;
        this.baseUrl = process.env.BHASHINI_BASE_URL || 'https://dhruva-api.bhashini.gov.in/services';
        this.userId = process.env.BHASHINI_USER_ID;
    }

    /**
     * Get supported languages from Bhashini
     */
    async getSupportedLanguages() {
        try {
            if (!this.apiKey) {
                console.log('Bhashini API key not configured, returning default languages');
                return this.getDefaultLanguages();
            }

            const response = await axios.get(`${this.baseUrl}/inference/pipeline`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching supported languages:', error.message);
            return this.getDefaultLanguages();
        }
    }

    /**
     * Translate text using Bhashini API
     * @param {string} text - Text to translate
     * @param {string} sourceLanguage - Source language code (e.g., 'en', 'hi')
     * @param {string} targetLanguage - Target language code (e.g., 'hi', 'ta')
     */
    async translateText(text, sourceLanguage = 'en', targetLanguage = 'hi') {
        try {
            if (!this.apiKey) {
                console.log('Bhashini API key not configured, returning original text');
                return { translatedText: text, sourceLanguage, targetLanguage };
            }

            const requestBody = {
                "pipelineTasks": [
                    {
                        "taskType": "translation",
                        "config": {
                            "language": {
                                "sourceLanguage": sourceLanguage,
                                "targetLanguage": targetLanguage
                            }
                        }
                    }
                ],
                "inputData": {
                    "input": [
                        {
                            "source": text
                        }
                    ]
                }
            };

            const response = await axios.post(`${this.baseUrl}/inference/pipeline`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'userID': this.userId
                }
            });

            if (response.data && response.data.pipelineResponse && response.data.pipelineResponse[0]) {
                const translatedText = response.data.pipelineResponse[0].output[0].target;
                return {
                    translatedText,
                    sourceLanguage,
                    targetLanguage,
                    confidence: response.data.pipelineResponse[0].config?.confidence || null
                };
            }

            return { translatedText: text, sourceLanguage, targetLanguage, error: 'Translation failed' };

        } catch (error) {
            console.error('Translation error:', error.message);
            return { translatedText: text, sourceLanguage, targetLanguage, error: error.message };
        }
    }

    /**
     * Detect language of given text
     * @param {string} text - Text to detect language for
     */
    async detectLanguage(text) {
        try {
            if (!this.apiKey) {
                console.log('Bhashini API key not configured, returning default language');
                return { language: 'en', confidence: 0 };
            }

            // This is a placeholder for language detection
            // Bhashini might have language detection capabilities
            // For now, we'll return a default implementation
            const requestBody = {
                "pipelineTasks": [
                    {
                        "taskType": "langdetection",
                        "config": {}
                    }
                ],
                "inputData": {
                    "input": [
                        {
                            "source": text
                        }
                    ]
                }
            };

            const response = await axios.post(`${this.baseUrl}/inference/pipeline`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'userID': this.userId
                }
            });

            // Process response based on actual Bhashini API response structure
            return response.data;

        } catch (error) {
            console.error('Language detection error:', error.message);
            return { language: 'en', confidence: 0, error: error.message };
        }
    }

    /**
     * Convert text to speech using Bhashini
     * @param {string} text - Text to convert to speech
     * @param {string} language - Language code
     */
    async textToSpeech(text, language = 'hi') {
        try {
            if (!this.apiKey) {
                console.log('Bhashini API key not configured');
                return { error: 'API key not configured' };
            }

            const requestBody = {
                "pipelineTasks": [
                    {
                        "taskType": "tts",
                        "config": {
                            "language": {
                                "sourceLanguage": language
                            }
                        }
                    }
                ],
                "inputData": {
                    "input": [
                        {
                            "source": text
                        }
                    ]
                }
            };

            const response = await axios.post(`${this.baseUrl}/inference/pipeline`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'userID': this.userId
                }
            });

            return response.data;

        } catch (error) {
            console.error('Text to speech error:', error.message);
            return { error: error.message };
        }
    }

    /**
     * Get default Indian languages when API is not available
     */
    getDefaultLanguages() {
        return {
            languages: [
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
                { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
            ]
        };
    }

    /**
     * Health check for Bhashini service
     */
    async healthCheck() {
        try {
            if (!this.apiKey) {
                return { 
                    status: 'not_configured', 
                    message: 'Bhashini API key not configured',
                    fallbackEnabled: true
                };
            }

            // Simple health check - try to get supported languages
            await this.getSupportedLanguages();
            return { 
                status: 'healthy', 
                message: 'Bhashini service is operational',
                apiConfigured: true
            };

        } catch (error) {
            return { 
                status: 'error', 
                message: error.message,
                fallbackEnabled: true
            };
        }
    }
}

export default new BhashiniService();