import express from 'express';
import LanguageService from '../../services/language.service.js';

const router = express.Router();

// Get supported languages
router.get('/languages', async (req, res) => {
    try {
        const languages = LanguageService.getSupportedLanguages();
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

// Validate language code
router.get('/validate/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const isSupported = LanguageService.isLanguageSupported(code);
        const language = LanguageService.getLanguageByCode(code);
        
        res.status(200).json({
            success: true,
            data: {
                isSupported,
                language: language || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error validating language code',
            error: error.message
        });
    }
});

// Health check
router.get('/health', async (req, res) => {
    try {
        const health = LanguageService.healthCheck();
        
        res.status(200).json({
            success: true,
            data: health
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking language service health',
            error: error.message
        });
    }
});

export default router;