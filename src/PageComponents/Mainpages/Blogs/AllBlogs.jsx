import Blogs from "./Blogs"
import './allblogs.css'
import { useEffect, useState } from 'react'
import SortBy from '../Image-Gallary/SortBy'
import { useNavigate } from 'react-router-dom'

export default function AllBlogs(){
    

    const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL 
     // eslint-disable-next-line no-constant-binary-expression
     let http = `${API_URL_BLOGS}blogs` 
    
    const [data,setData] = useState([])
     const [categoryFilter,setCategoryFilter] = useState(null)
   
    const [dateOrder,setDateOrder] = useState(null)


    const [loading,setLoading] = useState(false);
    
    

    const Nav = useNavigate()



function PrevPage(){
    Nav(-1)
}
    
       useEffect(() => {
          async function getBlogs(){
              setLoading(true)
             try{
                 const res = await fetch(http)
                 const result = await res.json();
                
                 setData(result.blogs)
               
    
             }catch(e){
                console.log(e)
             } finally{
                setLoading(false)
             }
             
          }
          
          getBlogs()
       },[http])
     
       const initialfilter = [...data].filter(item => item.category !== 'test')


     const filteredBlogs = [...initialfilter].filter(
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
            <div className="Header-wrapper" >
             
             <h1 className="categories-h1">All Blogs</h1>
             </div>
        <div className="all-blogs">

            <div className="sort-wrapper">
            <SortBy filterby="All Blogs" setCategory={setCategoryFilter} setDateOrder={setDateOrder}/>
            </div>
             <Blogs data={filteredBlogs} loading={loading}/>
        </div>
        </>
    )
}