import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2, } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import LanguageSelector from '../LanguageSelector';

const ChatBot = ({ schemeId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    
    // Use global language context
    const { currentLanguage } = useLanguage();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Reset messages when language changes
        setMessages([{
            text: getTranslation(currentLanguage, 'chatbot.welcome'),
            type: 'bot'
        }]);
    }, [currentLanguage]);

    const formatResponse = (text) => {
        // Remove asterisks and format sections
        const cleanText = text.replace(/\*\*/g, '');

        // Split into sections
        const sections = cleanText.split(/(?=\b(?:Objective|Key Features|Eligibility|How to Apply|Required Documents):)/g);

        return sections.map((section, index) => {
            if (section.trim()) {
                const [title, ...content] = section.split(':');
                if (content.length) {
                    return (
                        <div key={index} className="mb-3">
                            <div className="font-semibold text-[#74B83E]">{title.trim()}:</div>
                            <div className="pl-3">
                                {content.join(':').split('*').map((item, i) => (
                                    item.trim() && <div key={i} className="text-gray-700">{item.trim()}</div>
                                ))}
                            </div>
                        </div>
                    );
                }
                return <div key={index}>{section}</div>;
            }
            return null;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, type: 'user' }]);
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chatbot/scheme-response`,
                {
                    schemeId,
                    question: userMessage,
                    language: currentLanguage
                }
            );

            setMessages(prev => [...prev, {
                text: response.data.response,
                type: 'bot'
            }]);
        } catch (error) {
            console.error('Error getting chatbot response:', error);
            setMessages(prev => [...prev, {
                text: getTranslation(currentLanguage, 'chatbot.error'),
                type: 'bot'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#74B83E] text-white p-4 rounded-full shadow-lg hover:bg-[#5a9230] transition-colors"
                >
                    <MessageCircle size={24} />
                </button>
            ) : (
                <div className="bg-white rounded-lg shadow-xl w-[400px] h-[600px] flex flex-col">
                    <div className="bg-[#74B83E] text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={20} />
                            <h3 className="font-semibold">{getTranslation(currentLanguage, 'chatbot.title')}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <LanguageSelector 
                                compact={true} 
                                showLabel={false}
                                className="bg-[#5a9230] text-white"
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-[#5a9230] p-1 rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p>{getTranslation(currentLanguage, 'chatbot.welcome')}</p>
                        </div>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${message.type === 'user'
                                    ? 'bg-[#74B83E] text-white ml-auto'
                                    : 'bg-gray-100 mr-auto'
                                    } max-w-[85%]`}
                            >
                                {message.type === 'bot' ? formatResponse(message.text) : <p>{message.text}</p>}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <Loader2 className="animate-spin" size={20} />
                                <p>{getTranslation(currentLanguage, 'chatbot.thinking')}</p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={getTranslation(currentLanguage, 'chatbot.inputPlaceholder')}
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#74B83E]"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-[#74B83E] text-white p-2 rounded-lg hover:bg-[#5a9230] disabled:opacity-50"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;