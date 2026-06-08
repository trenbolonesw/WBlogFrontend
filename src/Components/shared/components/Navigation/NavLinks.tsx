import { NavLink } from "react-router-dom";
import './NavLinks.css'
import { useState,useEffect, useContext,useRef } from "react";
import { AuthContext } from "../../context/auth-context";
import retry from '../../../../assets/images/lock.svg'
import Button from "../FormElements/Button";
import Categories from "./Categories";
export default function NavLinks(){
   
  
const dropdownRef = useRef(null)
const categoryDropRef = useRef(null)
   const [drop,setDrop] = useState(false)
 const [categorypc,setCategorypc] = useState<boolean>(false)
  const [categorymobile,setCategorymobile] = useState<boolean>(false)
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

      
     function closeCategoryMenu(e:Event){
           if(categorypc && !categoryDropRef.current?.contains(e.target)){
            setCategorypc(false)
           }

     }
     document.addEventListener('mousedown',closeCategoryMenu)


 useEffect(()=> {
    function handleClickOutside(event:Event) {
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
        {drop && <div className="backdrop" ></div>}
        <div className="PcMenu" >
            <NavLink to="/" className="Link">Home</NavLink>
            <div className="Category-nav-pc">
            <Button onClick={() => setCategorypc(prev => !prev)} cssClass={categorypc ? "Category-Link-active":"Category-Link"}>Categories</Button>
            {categorypc ? <Categories ref={categoryDropRef}/> : null}
            </div>
              <NavLink to="/Blogs?page=1" className="Link">Blogs</NavLink>
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
            
         
              <div className="Category-nav-mobile">
            <Button onClick={() => setCategorymobile(prev => !prev)} cssClass={categorymobile ? "Category-Link-active":"Category-Link"}>Categories</Button>
            {categorymobile ? <Categories onClick={closeMenu}  /> : null}
            </div>
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