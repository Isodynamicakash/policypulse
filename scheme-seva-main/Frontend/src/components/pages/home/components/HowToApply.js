import { UserPlus, Search, CheckSquare } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { getTranslation } from "../../../../utils/translations";

const StepCard = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <Icon size={48} className="text-[#74B83E] mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HowToApply = () => {
    const { currentLanguage } = useLanguage();
    
    return (
        <section className=" px-8 py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">{getTranslation(currentLanguage, 'homePage.howToApplyTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StepCard
                        icon={UserPlus}
                        title={getTranslation(currentLanguage, 'homePage.enterDetails')}
                        description={getTranslation(currentLanguage, 'homePage.enterDetailsDesc')}
                    />
                    <StepCard 
                        icon={Search} 
                        title={getTranslation(currentLanguage, 'homePage.search')} 
                        description={getTranslation(currentLanguage, 'homePage.searchDesc')} 
                    />
                    <StepCard
                        icon={CheckSquare}
                        title={getTranslation(currentLanguage, 'homePage.selectAndApply')}
                        description={getTranslation(currentLanguage, 'homePage.selectAndApplyDesc')}
                    />
                </div>
            </div>
        </section>
    );
};

export default HowToApply

