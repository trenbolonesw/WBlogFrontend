import { useEffect,useState } from "react"
import './auth-header.css'
import { NavLink } from "react-router-dom"
export default function DashHeader(props){

const API_URL= import.meta.env.VITE_ADMIN_URL
 const [data,setData] = useState({admin:[]})
   let http = `${API_URL}Admins`
      useEffect(() => {
         async function getBlogs(){
            try{
                const res = await fetch(http)
                
                const result = await res.json();
                setData(result)
   
            }catch(e){
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
                

    return(
        <>
        <div className="dash-header">
            <NavLink className="linkone" to={`/g10mtK/${uniqueId}`}>OverView</NavLink>
            <NavLink className="linktwo" to="/AllPosts">Posts</NavLink>
            <NavLink className="linktwo" to="/newBlog">+New Post</NavLink>
             <NavLink className="linktwo" to="/NewGallery">+New Gallery</NavLink>
            <NavLink className="linktwo" to="/Categories">Categories</NavLink>
           
        </div>
        </>
    )
}