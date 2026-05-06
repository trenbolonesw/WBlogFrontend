import './Gallery.css'

import {useNavigate } from 'react-router-dom'
import SortBy from './SortBy'
import Images from './Images.jsx'
import { useEffect, useState } from 'react'
export default function ImageGallary(){

    

    const [GallaryData,setGallary] = useState([])
     
    const [categoryFilter,setCategoryFilter] = useState(null)
   
    const [dateOrder,setDateOrder] = useState(null)
    
    


const Nav = useNavigate()



function PrevPage(){
    Nav(-1)
}

const URL = import.meta.env.VITE_GALLERY_URL

useEffect(() => {



async function getImages(){
 try{
 const res = await fetch(`${URL}photos`)
 
   if(!res.ok){
                    throw new Error('error!')
                   }
                const result = await res.json()
                 console.log(result.photo)
                 setGallary(result.photo)

 }catch(e){
    
 }
  

}

getImages()
},[])

 const filteredGallery = [...GallaryData].filter(
    item => {
        if(!categoryFilter) return true;
        return item.category === categoryFilter
    }
 ).sort((a,b) => {
    if(dateOrder === 'Newest'){
        return new Date(b.created_at) - new Date(a.created_at) 
    } 
    if(dateOrder === 'Oldest'){
        return new Date(a.created_at) - new Date(b.created_at) 
    }
 })


    return(
        <>
        <div className='Main-Page'>
           
           <div className='Gflex-box'>
            <div className='right'>
           
           <h2 className='inter-url'>Photo Gallery</h2>
           </div>
           <div className='left'>
               <SortBy
               filterby="photos"
               setCategory={setCategoryFilter}
               setDateOrder={setDateOrder}
            
               />
           </div>
           

             </div>
                <Images Gallery={filteredGallery}/>
        </div>
        </>
    )
}