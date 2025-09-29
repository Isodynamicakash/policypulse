"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { getTranslation } from "../../../../utils/translations";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button className="flex justify-between items-center w-full text-left" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-semibold">{question}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
        </div>
    );
};

const FAQ = () => {
    const { currentLanguage } = useLanguage();
    
    const faqs = [
        {
            question: getTranslation(currentLanguage, 'homePage.faq1'),
            answer:
                "You can apply for a scheme by visiting our 'Explore Schemes' section, selecting the relevant scheme, and following the application process outlined there. Make sure you meet the eligibility criteria before applying.",
        },
        {
            question: getTranslation(currentLanguage, 'homePage.faq2'),
            answer:
                "The required documents vary depending on the scheme. Generally, you'll need proof of identity (such as Aadhaar card), address proof, income certificate, and sometimes category certificates (SC/ST/OBC). Specific requirements are listed on each scheme's page.",
        },
        {
            question: getTranslation(currentLanguage, 'homePage.faq3'),
            answer:
                "Eligibility for central schemes varies. Typically, factors like age, income, occupation, and sometimes location are considered. Some schemes are targeted at specific groups like women, farmers, or students. Check the specific scheme's eligibility criteria for accurate information.",
        },
        {
            question: getTranslation(currentLanguage, 'homePage.faq4'),
            answer:
                "The processing time varies for different schemes. Some may provide instant approval, while others might take a few weeks to months. The estimated processing time is usually mentioned in the scheme details. You can also track your application status through our portal.",
        },
        {
            question: getTranslation(currentLanguage, 'homePage.faq5'),
            answer:
                "Yes, you can apply for multiple schemes as long as you meet the eligibility criteria for each. However, some schemes may have restrictions on availing benefits from multiple sources, so it's important to read the terms and conditions carefully.",
        },
        {
            question: getTranslation(currentLanguage, 'homePage.faq6'),
            answer:
                "If your application is rejected, you will receive a notification explaining the reason. You can review the rejection reason and reapply if you think there was an error or if you can provide additional information. If you need assistance, you can contact our support team for guidance on the next steps.",
        },
    ];

    return (
        <section className="px-8 py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">{getTranslation(currentLanguage, 'homePage.faqTitle')}</h2>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ

