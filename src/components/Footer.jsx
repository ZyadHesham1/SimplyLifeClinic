import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.jpeg";

const Footer = () => {
  const { t } = useTranslation();
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // If "app=true" is in the URL, hide the footer.
    if (params.get("app") === "true") {
      setHideFooter(true);
    }
  }, []);

  if (hideFooter) return null; // Do not render footer if in WebView

  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-8 mr-3" alt="Simply Life Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {t("simply")}
              </span>
            </Link>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                {t("Resources")}
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    {t("simply")}
                  </Link>
                </li>
                {/* <li>
                  <a href="https://www.facebook.com/profile.php?id=61573108233835" className="hover:underline">
                  {t("Facebook")}
                  </a>
                </li> */}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                {t("Follow us")}
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="https://www.facebook.com/profile.php?id=61573108233835" className="hover:underline">
                  {t("Facebook")}
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/simply.life.mental.health" className="hover:underline">
                  {t("Instagram")}
                  </a>
                </li>
              </ul>
            </div>

            {/* <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                {t("Legal")}
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    {t("Privacy Policy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("Terms & Conditions")}
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto" />

        {/* Footer Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025{" "}
            <a href="#" className="hover:underline">
            {t("simply")}
            </a>
            . {t("All Rights Reserved")}.
          </span>

          {/* Social Media Icons
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {[
              { href: "#", icon: "facebook", sr: "Facebook page" },
              { href: "#", icon: "twitter", sr: "Twitter page" },
              { href: "#", icon: "instagram", sr: "Instagram" },
              { href: "#", icon: "github", sr: "GitHub account" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-500 hover:text-gray-900 mx-2"
              >
                <span className="sr-only">{social.sr}</span>
                <i className={`fab fa-${social.icon} text-xl`}></i>
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
