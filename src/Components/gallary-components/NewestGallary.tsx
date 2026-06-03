import Images from "../../Mainpages/Image-Gallary/Images";
import { useState,useEffect } from "react";
import NewestWrapper from "../shared/components/UIElements/Newest-Wrapper";
import LoadingModal from "../modals/LoadingModal";
export default function NewestGallary(){
    const API_URL_GALLERY = import.meta.env.VITE_GALLERY_URL


    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    
    const http = `${API_URL_GALLERY}newest?limit=5`
       
       useEffect(() => {
          async function getBlogs(){
              setLoading(true)
             try{
                 const res = await fetch(http)
                 const result = await res.json();
                
                 setData(result.photos)
               
    
             }catch(e){
                console.log(e)
            
             } finally{
                setLoading(false)
             }
             
          }
          
          getBlogs()
       },[http])
    
       const firstGallary = data.slice(0,1)
       const secondaryphotos = data.slice(1,5)
    
     
 return(
    <>
    <NewestWrapper leftCard={firstGallary} title="Newest Gallary" url={'/gallery'}>
<Images gallary={secondaryphotos}/>

   </NewestWrapper>
  
    </>
 )

}