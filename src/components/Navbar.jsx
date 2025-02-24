import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo-removebg.png';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import LanguageSwitch from './LanguageSwitch';

const Navbar = () => {
  const { t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const navigation = [
    { name: t("navbar.home"), to: "/" },
    //{ name: t("navbar.test"), to: "/admin" },
    { name: t("navbar.appointment"), to: "/calendar" },
    //{ name: t("navbar.disorders"), to: "/category/depression" },
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-[var(--color-text)] flex items-center px-6 py-2">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center justify-start">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={logo} alt={t("navbar.logo_alt")} className="h-8 w-8" />
        </Link>
      </div>

      {/* Center: Title */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-xl font-bold whitespace-nowrap text-[var(--color-background)]">
          {t("navbar.title")}
        </h1>
      </div>

      {/* Right: Navigation and Language Switch */}
      <div className="flex-1 flex items-center justify-end">
        <div className="hidden lg:flex items-center gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="px-4 py-2 rounded-md transition-all duration-200 text-[var(--color-background)] hover:text-[var(--color-background)] hover:bg-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
            >
              {item.name}
            </Link>
          ))}
          <Link
            onClick={(e) => {
              e.preventDefault();
              const newLang = i18n.language === "en" ? "ar" : "en";
              i18n.changeLanguage(newLang);
            }}
            to="#"
            className="px-4 py-2 rounded-md transition-all duration-200 cursor-pointer text-[var(--color-background)] hover:text-[var(--color-background)] hover:bg-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
          >
            {i18n.language === "en" ? "العربية" : "English"}
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-[var(--color-text)] hover:text-[var(--color-dark)] focus:outline-none bg-[var(--color-accent)]"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;