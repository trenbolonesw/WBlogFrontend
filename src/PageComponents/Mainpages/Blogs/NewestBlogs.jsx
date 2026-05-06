import Blogs from "./Blogs";
import { useState,useEffect } from "react";
import LoadingModal from "../../modals/LoadingModal";
export default function NewestBlogs(){

const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL 
 // eslint-disable-next-line no-constant-binary-expression
 let http = `${API_URL_BLOGS}blogs` 

const [data,setData] = useState([])
const [loading,setLoading] = useState(false);
   
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

   const weekAgo = new Date()

   weekAgo.setDate(weekAgo.getDate() - 7)

 const filteredBlogs = [...data].filter((blog) => new Date(blog.created_at) >= weekAgo && blog.category !== 'test')
 .sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,4)



    
    return(
    <>
   {filteredBlogs.length <= 1 ? <Blogs data={filteredBlogs} loading={loading}/> : <h2>No New Blogs</h2>}
    <a className='see-more' href='/Blogs'>View All Blogs</a>
    
    </>
    )
}