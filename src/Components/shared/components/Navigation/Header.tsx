import NavLinks from "./NavLinks"
import './Header.css'
import { Link } from "react-router-dom"
import hero from '../../../../assets/images/WBlog.svg'




export default function Header(){







 
  
    return(
        <>
        <div className={`Header`}>
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