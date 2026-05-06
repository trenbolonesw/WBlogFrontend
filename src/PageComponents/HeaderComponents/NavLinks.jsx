import { NavLink } from "react-router-dom";
import './NavLinks.css'
import React, { useState,useEffect, useContext,useRef } from "react";
import { AuthContext } from "../../context/auth-context";
import retry from '../../assets/images/lock.svg'
export default function NavLinks(){
   
  
const dropdownRef = useRef(null)
   const [drop,setDrop] = useState(false)

   const auth = useContext(AuthContext)
   
  

   function toggleMenu(){
           setDrop(menu => !menu)
        
    }

   function closeMenu(){
     setDrop(false)
    
   }


   const API_URL= import.meta.env.VITE_ADMIN_URL

   const [data,setData] = useState({admin:[]})

   let http = `${API_URL}Admins`
      useEffect(() => {
         async function getBlogs(){
            try{
                const res = await fetch(http)
                
                const result = await res.json();
                setData(result)
   
            }
            catch(e){
            console.log(e)
            }
            
         }
         getBlogs()
      },[http])
   
     if(!data){
        return (<p>loading..</p>)
     }

          const uniqueId = Array.from(
            new Set(data.admin.map(admin => admin.id))
                )


 useEffect(()=> {
    function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDrop(false);
    }
  }

  if (drop) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
 },[drop])
           
    return(
        <>
        {drop && <div className="backdrop" onClick={closeMenu}></div>}
        <div className="PcMenu" >
            <NavLink to="/" className="Link">Home</NavLink>
            <NavLink to="/Categories" className="Link">Categories</NavLink>
              <NavLink to="/Blogs" className="Link">All Blogs</NavLink>
              {/* <NavLink to="applesg10" className="Link">login</NavLink> */}
              <NavLink to="/Gallery" className='Link'>Gallary</NavLink>
             <NavLink to="/applesG10" className="admin-link"><img height={60} src={retry}/></NavLink>
                
         {auth.isLoggedIn && <NavLink key={auth.userId} to={`/g10mtK/${auth.userId}`} className="Link">Admin</NavLink>}
          {auth.isLoggedIn && <button className="logout" onClick={auth.logout}>logout</button>}
        
             
              
        </div>
         <div ref={dropdownRef} className="MobileMenu">
            <button className={`${drop?'menu-button-active':'menu-button'} ${drop ? 'menu-flip':'menu-revert'}`} onClick={toggleMenu}>
                <span className={`${drop? "span-active":'span'}`}></span>
                <span className={`${drop? "span-active":'span'}`}></span>
                <span className={`${drop? "span-active":'span'}`}></span>
            </button>
            <div className={`dropdown ${drop ? 'show':''}`}>
            <NavLink to="/" className="mobile-link" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/Categories" className="mobile-link" onClick={closeMenu}>Categories</NavLink>
            <NavLink to="/Blogs" className="mobile-link" onClick={closeMenu}>All Blogs</NavLink>
            {/* <NavLink to="applesg10" className="mobile-link">login</NavLink> */}
             <NavLink to="/Gallery" className='mobile-link' onClick={closeMenu}>Gallary</NavLink>
              
                
            
         
            {auth.isLoggedIn &&  <NavLink key={auth.userId} to={`/g10mtK/${auth.userId}`} className="mobile-link" onClick={closeMenu}>Admin</NavLink>}
            {auth.isLoggedIn && <button className="logout" onClick={auth.logout}>logout</button>}
         
          
          
            </div>
            

        </div>
        </>
    )
}