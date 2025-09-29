// import logo from "../../../utils/images/footer/logo.svg";
// import location from "../../../utils/images/footer/location.svg";
import instagram from "../../../utils/images/footer/instagram.png";
import facebook from "../../../utils/images/footer/facebook.png";
import youtube from "../../../utils/images/footer/youtube.png";
import x from "../../../utils/images/footer/twitter.png";
import { useLanguage } from "../../../context/LanguageContext";
import { getTranslation } from "../../../utils/translations";
import "./footer.css";

const Footer = () => {
    const { currentLanguage } = useLanguage();
    
    const quickLinks = [
        getTranslation(currentLanguage, 'footer.about'),
        getTranslation(currentLanguage, 'footer.contact'),
        getTranslation(currentLanguage, 'footer.privacyPolicy'),
        getTranslation(currentLanguage, 'footer.termsConditions'),
        getTranslation(currentLanguage, 'footer.account'),
    ];
    const categories = [
        getTranslation(currentLanguage, 'footer.explore'),
        getTranslation(currentLanguage, 'footer.newSchemes'),
        getTranslation(currentLanguage, 'homePage.education'),
        getTranslation(currentLanguage, 'footer.health'),
        getTranslation(currentLanguage, 'homePage.agriculture'),
    ];
    const socialMedia = [facebook, x, instagram, youtube];

    return (
        <footer className="flex flex-col font-raleway ">
            <div className="flex bg-white justify-center py-8">
                <div className="flex flex-wrap gap-6 px-6 md:w-11/12 lg:w-10/12 justify-between">
                    <div className="flex flex-col gap-2">
                        {/* Contact information removed as requested */}
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{getTranslation(currentLanguage, 'footer.quickLinks')}</h3>
                        <div className="flex flex-col gap-1">
                            {quickLinks.map((link, index) => (
                                <p
                                    key={index}
                                    className="text-lg font-medium cursor-pointer w-fit">
                                    {link}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{getTranslation(currentLanguage, 'footer.categories')}</h3>
                        <div className="flex flex-col gap-1">
                            {categories.map((category, index) => (
                                <p
                                    key={index}
                                    className="text-lg font-medium cursor-pointer w-fit">
                                    {category}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{getTranslation(currentLanguage, 'footer.connect')}</h3>
                        <div className="flex gap-2 cursor-pointer">
                            {socialMedia.map((icon, index) => (
                                <div key={index}>
                                    <img
                                        src={icon}
                                        alt={index}
                                        className="w-8"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#000] w-full flex justify-center items-center flex-col">
                <p className="text-white mt-2 font-poppins font-medium text-xl">
                    {getTranslation(currentLanguage, 'footer.copyright')}
                </p>
                <p className="font-mono font-bold text-xl py-1 mb-2">
                    <span className="shiny-text text-[#FF0000]">
                        {getTranslation(currentLanguage, 'footer.developedBy')}
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
