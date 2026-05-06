import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

import './Dash.css'


import MyChart from "./dashboard-components/chart"

export default function DashBoard(){
  
const {id} = useParams()

    const [Info,setInfo] = useState({admin:[]})
 const [blogInfo,setBlogInfo] = useState({blogs:[]})
 const [GalleryInfo,setGalleryInfo] = useState([])
    
const API_URL = import.meta.env.VITE_ADMIN_URL
const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
const API_URL_GALLERY = import.meta.env.VITE_GALLERY_URL
    useEffect(() => {
         async function getAdmin(){
            try{
                const res = await fetch(`${API_URL}${id}`)
                
                const result = await res.json();
   
                setInfo(result)
   
            }catch(e){
               console.log(e)
            }
            
         }

        
         getAdmin()
         
      },[API_URL,id])
           useEffect(() => {
  async function getBlogInfo(){
            try{
              const res = await fetch(`${API_URL_BLOGS}blogs`)
                const result = await res.json();

                setBlogInfo(result)

            }catch(e){
                   console.log(e)
            }
         }
         getBlogInfo()


        
  },[])

  useEffect(() => {
  async function getGallaryInfo(){
            try{
             
              const res = await fetch(`${API_URL_GALLERY}photos`)
              const result = await res.json()
            setGalleryInfo(result.photo)


            }catch(e){
                console.log(e)
            }
         }

         getGallaryInfo()
  },[])

  
  
 const blogNumber = blogInfo.blogs.length
 const GalleryPhotos = GalleryInfo.length
  
 const adminName = Info.admin.map(i => {
   return i.name
 })
 
    return(
        <div className="Dashboard-layout">
       
          
            <h3 className="adminName">{adminName}'s DashBoard</h3> 
             
            <div className="dashboard">
                <div className="dashboard-blocks">blog count<p className="blogNumber">{blogNumber}</p></div>
                <div className="dashboard-blocks">Gallary Photo Count <p className="blogNumber">{GalleryPhotos}</p></div>
                <div className="dashblog-stats"><MyChart/></div>
            </div>
               
        </div>
    )
}