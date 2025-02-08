import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';



const MainLayout = () => {
  const {t} = useTranslation();
      
  const lng = Cookies.get("i18next") || "en";

  useEffect(()=> {  
    window.document.dir = i18n.dir();
  }, [lng]);
  

  return (
    <>
    
    <Navbar />
    <Outlet />
    <Footer/>
    </>
  )
}

export default MainLayout