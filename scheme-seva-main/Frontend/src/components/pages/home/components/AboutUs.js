import { Info, Target, Users, Shield } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { getTranslation } from "../../../../utils/translations";

const AboutUs = () => {
    const { currentLanguage } = useLanguage();
    
    return (
        <section className="px-8 py-12 ">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">{getTranslation(currentLanguage, 'homePage.aboutUsTitle')}</h2>
                <div className="max-w-4xl mx-auto text-center">
                    <Info size={48} className="text-[#74B83E] mx-auto mb-4" />
                    <p className="text-gray-600 mb-8 text-lg">
                        {getTranslation(currentLanguage, 'homePage.aboutUsDesc')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <Target className="text-[#74B83E] mx-auto mb-2" size={32} />
                            <h3 className="font-semibold mb-2">{getTranslation(currentLanguage, 'homePage.ourMission')}</h3>
                            <p className="text-sm text-gray-600">
                                {getTranslation(currentLanguage, 'homePage.ourMissionDesc')}
                            </p>
                        </div>
                        <div>
                            <Users className="text-[#74B83E] mx-auto mb-2" size={32} />
                            <h3 className="font-semibold mb-2">{getTranslation(currentLanguage, 'homePage.whoWeServe')}</h3>
                            <p className="text-sm text-gray-600">
                                {getTranslation(currentLanguage, 'homePage.whoWeServeDesc')}
                            </p>
                        </div>
                        <div>
                            <Shield className="text-[#74B83E] mx-auto mb-2" size={32} />
                            <h3 className="font-semibold mb-2">{getTranslation(currentLanguage, 'homePage.ourCommitment')}</h3>
                            <p className="text-sm text-gray-600">
                                {getTranslation(currentLanguage, 'homePage.ourCommitmentDesc')}
                            </p>
                        </div>
                    </div>
                    <button className="bg-[#74B83E] text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                        {getTranslation(currentLanguage, 'homePage.learnMoreButton')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutUs

