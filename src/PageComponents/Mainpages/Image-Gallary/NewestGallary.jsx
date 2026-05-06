import Images from "./Images";
import { useState,useEffect } from "react";
import './newestgallary.css'
import LoadingModal from "../../modals/LoadingModal";
export default function NewestGallary(){
    const API_URL_GALLERY = import.meta.env.VITE_GALLERY_URL

// filter gallary through backend then render requests conditionally
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    
    const http = `${API_URL_GALLERY}photos`
       
       useEffect(() => {
          async function getBlogs(){
              setLoading(true)
             try{
                 const res = await fetch(http)
                 const result = await res.json();
                
                 setData(result.photo)
               
    
             }catch(e){
                console.log(e)
            
             } finally{
                setLoading(false)
             }
             
          }
          
          getBlogs()
       },[http])
    
       const weekAgo = new Date()
    
       weekAgo.setDate(weekAgo.getDate() - 7)
    
     const filteredPhotos = [...data].filter(blog => new Date(blog.created_at) >= weekAgo)
     .sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,4)
    
     
 return(
    <>
    <div className="wrapper">
{ filteredPhotos.length > 0 ?<Images Gallery={filteredPhotos}/>:<h2>No New Photos</h2>}
    <a className='see-more' href='/Gallery'>View full gallary</a>
   </div>
  
    </>
 )

}