import { Outlet } from "react-router-dom";

import insta from '../assets/images/Instagram.webp'
import yt from '../assets/images/Youtube.png'
import './layout.css'
import Header from "../Components/shared/components/Navigation/Header";
import Footer from "../Components/shared/components/Navigation/Footer";


export default function Layout(){

 

  return (
   <div className="Layout">
   
       <Header/>
        
        <Outlet/>
      
        <Footer yt={yt} insta={insta}/>
   
       
    </div>
  )
}

