import './Gallery.css'

import { useEffect, useState } from 'react';
import BlogWrapper from '../../Components/blogcomponents/Blog-pages-wrapper';
import { Gallary } from '../../Types/Blog-Data-types';
import ImageSlideShow from '../../Components/gallary-components/ImageSlideShow';



export default function ImageGallary(){


    const [GallaryData,setGallary] = useState<Gallary[]>([])



const URL = import.meta.env.VITE_GALLERY_URL

useEffect(() => {



async function getImages(){
 try{
 const res = await fetch(`${URL}photos`)
 
   if(!res.ok){
                    throw new Error('error!')
                   }
                const result = await res.json()
                 
                 setGallary(result.photo)

 }catch(e){
    
 }
  

}

getImages()
},[])

 

    return(
        <>
         
          <BlogWrapper title="Gallary">          
            
               <ImageSlideShow GallaryData={GallaryData}/> 
                
      
        </BlogWrapper>  
        </>
    )
}