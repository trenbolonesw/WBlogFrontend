import './Gallery.css'

import Images from './Images.js'
import { useEffect, useState } from 'react'
import BlogWrapper from '../../Components/blogcomponents/Blog-pages-wrapper'
import { Gallary } from '../../Types/Blog-Data-types'
export default function ImageGallary(){


    const [GallaryData,setGallary] = useState<Gallary[]>([])
     
 
    
    //hello there







const URL = import.meta.env.VITE_GALLERY_URL

useEffect(() => {

//another test

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
           
                <Images gallary={GallaryData}/>

        </BlogWrapper>  
        </>
    )
}