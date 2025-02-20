import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={() => {
        console.log("Button clicked!");
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
      }}
      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
    >
      {i18n.language === "en" ? "العربية" : "English"}
    </button>
  );
};

export default LanguageSwitch;
