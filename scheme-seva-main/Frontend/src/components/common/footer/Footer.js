// import logo from "../../../utils/images/footer/logo.svg";
// import location from "../../../utils/images/footer/location.svg";
import instagram from "../../../utils/images/footer/instagram.png";
import facebook from "../../../utils/images/footer/facebook.png";
import youtube from "../../../utils/images/footer/youtube.png";
import x from "../../../utils/images/footer/twitter.png";
import "./footer.css";

const Footer = () => {
    const quickLinks = [
        "about",
        "contact",
        "privacy policy",
        "terms & conditions",
        "account",
    ];
    const categories = [
        "Explore",
        "New Schemes",
        "Education",
        "Health",
        "Agriculture",
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
                        <h3 className="font-bold text-3xl mb-3">Quick Links</h3>
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
                        <h3 className="font-bold text-3xl mb-3">Categories</h3>
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
                        <h3 className="font-bold text-3xl mb-3">Connect</h3>
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
                    &copy; 2025 PolicyPulse. All rights reserved.
                </p>
                <p className="font-mono font-bold text-xl py-1 mb-2">
                    <span className="shiny-text text-[#FF0000]">
                        Developed by Team UXplorers
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
