import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../zyad/navlogo.png';
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
    <nav className={`
      sticky top-0 z-50 shadow-md
      bg-[var(--color-text)]
      flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}
      justify-between items-center px-6 py-2
      `}>
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-2 hover:opacity-80 transition-opacity z-20"
      >
        <img 
          src={logo}
          alt={t("navbar.logo_alt")} 
          className="h-8 w-8" 
        />
      </Link>

      {/* Title - Always Centered */}
      <div className="absolute inset-x-0 flex justify-center z-10">
        <h1 className="text-xl font-bold whitespace-nowrap text-[var(--color-background)]">
          {t("navbar.title")}
        </h1>
      </div>


      {/* Desktop Navigation */}
      <div className={`
        hidden lg:flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2
      `}>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`
              px-4 py-2 rounded-md transition-all duration-200
              text-[var(--color-background)] hover:text-[var(--color-background)]
              hover:bg-[var(--color-accent)]
              focus:outline-none focus:ring-2
              focus:ring-[var(--color-primary)] focus:ring-opacity-50
            `}
          >
            {item.name}
          </Link>
          
        ))}
        <div className="hidden lg:flex items-center gap-4 relative z-50">
          <LanguageSwitch />
        </div>

      </div>
      

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`
            p-2 rounded-md
            text-[var(--color-text)] hover:text-[var(--color-dark)]
            focus:outline-none bg-[var(--color-accent)]
          `}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Transition */}
      <Transition
        show={isMobileMenuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className={`
              absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-full
              bg-[var(--color-dark)] lg:hidden shadow-lg z-10
              pt-16 pb-4
            `}
          >
            <div className="px-4 pt-2 space-y-2">
            <LanguageSwitch />
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-md transition-all duration-200
                   text-[var(--color-background)] hover:text-[var(--color-background)]
                    hover:bg-[var(--color-accent)]
                    focus:outline-none focus:ring-2
                    focus:ring-[var(--color-primary)] focus:ring-opacity-50
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Transition>
      
    </nav>
  );
};

export default Navbar;