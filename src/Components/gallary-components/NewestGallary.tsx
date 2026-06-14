
import { useState,useEffect } from "react";

import FeaturedSlideShow from "./FeaturedSlideShow";
import NewestWrapper from "../shared/components/UIElements/Newest-Wrapper";
export default function NewestGallary(){
    const API_URL_GALLERY = import.meta.env.VITE_GALLERY_URL


    const [photos,setPhotos] = useState([])
    const [loading,setLoading] = useState(false)
    
    const http = `${API_URL_GALLERY}newest?limit=5`
       
       useEffect(() => {
          async function getBlogs(){
              setLoading(true)
             try{
                 const res = await fetch(http)
                 const result = await res.json();
                
                 setPhotos(result.photos)
               
    
             }catch(e){
                console.log(e)
            
             } finally{
                setLoading(false)
             }
             
          }
          
          getBlogs()
       },[http])

 
     
 return(
   <>
<FeaturedSlideShow url="/Gallery" items={photos} title="Latest Gallary"/>
  
    </>
 )

}