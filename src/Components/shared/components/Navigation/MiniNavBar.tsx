import { NavLink } from "react-router-dom";
import './mini-navbar.css'

export default function MiniNavBar(){
    return(
       <div>
       <div className="mini-navbar">
                <NavLink className='C-link' to={`/Categories/Exploration`}>
           <h3 className=''>Exploration </h3>
        </NavLink>
       
              <NavLink className='C-link' to={`/Categories/History`}>
                <h3 className=''>History</h3>
                 </NavLink>
                            <NavLink className='C-link' to={`/Categories/Photography`}>
                <h3 className=''>Photography</h3>
                </NavLink>
          </div>
       </div>
    )
}