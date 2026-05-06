import NavLinks from "./NavLinks"
import './Header.css'
import { Link } from "react-router-dom"
import { useState,useEffect, useRef } from "react"
import hero from '../../assets/images/Wblog.svg'
export default function Header({backdrop}){

 const [showUI, setShowUI] = useState(true);





 
  
    return(
        <>
        <div className={`Header ${showUI ? 'visible' : 'hidden'}`}>
            <Link to='/' >
            <img className="logo" src={hero}/>
            </Link>
            <div className="space-nav">
              <NavLinks/>
            </div>
           
        </div>
        </>
    )
}