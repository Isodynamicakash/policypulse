import express from 'express';
import BhashiniService from '../../services/bhashini.service.js';

const router = express.Router();

// Get supported languages
router.get('/languages', async (req, res) => {
    try {
        const languages = await BhashiniService.getSupportedLanguages();
        res.status(200).json({
            success: true,
            data: languages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching supported languages',
            error: error.message
        });
    }
});

// Translate text
router.post('/translate', async (req, res) => {
    try {
        const { text, sourceLanguage = 'en', targetLanguage = 'hi' } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required for translation'
            });
        }

        const result = await BhashiniService.translateText(text, sourceLanguage, targetLanguage);
        
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error translating text',
            error: error.message
        });
    }
});

// Detect language
router.post('/detect-language', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required for language detection'
            });
        }

        const result = await BhashiniService.detectLanguage(text);
        
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error detecting language',
            error: error.message
        });
    }
});

// Text to speech
router.post('/text-to-speech', async (req, res) => {
    try {
        const { text, language = 'hi' } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required for text-to-speech'
            });
        }

        const result = await BhashiniService.textToSpeech(text, language);
        
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error converting text to speech',
            error: error.message
        });
    }
});

// Health check
router.get('/health', async (req, res) => {
    try {
        const health = await BhashiniService.healthCheck();
        
        res.status(200).json({
            success: true,
            data: health
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking Bhashini service health',
            error: error.message
        });
    }
});

export default router;