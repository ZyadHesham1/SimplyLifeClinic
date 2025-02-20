import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageModal = () => {
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      setShowModal(true);
    }
  }, []);

  const selectLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("visited", "true");
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200/50 backdrop-blur-lg">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 animate-slide-down">مرحبا</h1>
          <h1 className="text-4xl font-bold mb-4 animate-slide-up">Welcome</h1>
          <button
            onClick={() => selectLanguage("ar")}
            className="bg-blue-600 text-white px-4 py-2 m-2 rounded transition hover:bg-blue-800"
          >
            العربية
          </button>
          <button
            onClick={() => selectLanguage("en")}
            className="bg-gray-600 text-white px-4 py-2 m-2 rounded transition hover:bg-gray-800"
          >
            English
          </button>
        </div>
      </div>
    )
  );
};

export default LanguageModal;
