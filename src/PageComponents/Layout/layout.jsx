import { Outlet } from "react-router-dom";

import insta from '../../assets/images/Instagram.webp'
import yt from '../../assets/images/Youtube.png'
import './layout.css'
import { AuthContext } from "../../context/auth-context";
import Header from '../../PageComponents/HeaderComponents/Header'
import Footer from "../HeaderComponents/Footer";
import { useContext } from "react";

export default function Layout(){

 const auth = useContext(AuthContext)

  return (
   <div className="Layout">
   
       <Header/>
        
        <Outlet/>
      
        <Footer yt={yt} insta={insta}/>
   
       
    </div>
  )
}

