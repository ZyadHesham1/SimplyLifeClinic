import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CatSlider from '../components/CatSlider'
import Hero from '../components/Hero'
import OurMessage from '../components/OurMessage'
import OurCommitment from '../components/OurCommitment'
import MainDrs from '../components/MainDrs'

const HomePage = () => {
    const { t, i18n } = useTranslation();

    return (
      <>

        <button
          onClick={()=> {
            i18n.changeLanguage("ar");
          }}
        >Arabic</button>
        
        <button
          onClick={()=>{
            i18n.changeLanguage("en")
          }}
        >English</button>
      
      
        <CatSlider/>
        <Hero/>
        <OurMessage/>
        <OurCommitment/>
        <MainDrs/>

  
        {/* <TestimonialSlider /> */}
  
        {/* <AboutMainTelecom/> */}
        


      </>
    );
  };
  
  export default HomePage;
  