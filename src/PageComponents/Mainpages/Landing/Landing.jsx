import './Landing.css'

import Hero from '../../../assets/images/HeroImage.jpg'
import aboutImage from '../../../assets/images/about_image.jpg'
import { useState,useEffect, useRef } from 'react'
import NewestBlogs from '../Blogs/NewestBlogs';
import Images from '../Image-Gallary/Images';
import NewestGallary from '../Image-Gallary/NewestGallary';

export default function LandingPage(){

const [showUI, setShowUI] = useState(true);

 const lastScrollY = useRef(0)
  

   useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastScrollY.current) < 5) return;

      if (currentY > lastScrollY.current) {
        setShowUI(false); // scrolling down
      } else {
        setShowUI(true); // scrolling up
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    return(
        <>
        <div className='landing-page'>
        <section className='hero-section'>
         <div className='flex-box'>
          <div className='right-hero'>
            <h1 className='title-url'>WBlog</h1>
            <p className='About'>Bringing you the best Photos and Blogs</p>
            </div>
            <img alt='An image of a photographer taking a photo of something scenic'  className='hero-image' src='https://res.cloudinary.com/dciywsh4y/image/upload/v1770170476/opengraphimage_jzodcs.png'/>
            </div> 
        </section>
          <section className='about'>
            <div className='inner-about'>
                  <h1 className='about-header'>Who Am I?</h1>
                <p className='inner-aboutp'> Hi, i’m Riley. I’m a photographer who specializes in photographing and documenting the grain elevators in Manitoba. 
                  My goal is to photograph every elevator in Manitoba and to be a pillar in the grain elevator community. Some of my photos have made it on the Manitoba Historical Society page. 
                  You can find my photos on <a className="a" href="https://www.instagram.com/riley_waldner_photography/?hl=en" target="_blank"> Instagram </a> 
               </p> 
               
              </div>
              <div>
                <img className='about-image' src={aboutImage}/>
              </div>
               </section>
       
        <section className="landing-blogs-section"> 
           <h3 className='new-blogs'>Newest Blogs</h3>
         <div className='divider'></div>
               <NewestBlogs/>
           <div className="footer-spacer"></div>
         <h3 className='new-blogs'>Newest Photography</h3>
         <div className='divider'></div>
  <NewestGallary/>
      
        </section>
       </div>
        </>
    )
}