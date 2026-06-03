import Blogs from "./blogs";
import { useState,useEffect } from "react";
import LoadingModal from "../modals/LoadingModal";
import { Blog } from "../../Types/Blog-Data-types";
import NewestWrapper from "../shared/components/UIElements/Newest-Wrapper";

export default function NewestBlogs(){

const API_URL_BLOGS = import.meta.env.VITE_ALL_BLOGS_URL 
 // eslint-disable-next-line no-constant-binary-expression
 let http = `${API_URL_BLOGS}newest?limit=5` 

const [data,setData] = useState<Blog[]>([])
const [loading,setLoading] = useState<boolean>(false);
   
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

    

const newestBlog = data.slice(0,1)
const secondaryBlogs = data.slice(1,5)

    return(
    <>

 

  <NewestWrapper leftCard={newestBlog} title="Newest Blogs" url={'/blogs'}>
 

  <Blogs blogs={secondaryBlogs} loading={loading}/> 
 
  </NewestWrapper>

    
    </>
    )
}