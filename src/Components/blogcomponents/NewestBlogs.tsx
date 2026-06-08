import Blogs from "./blogs";
import { useState,useEffect } from "react";
import LoadingModal from "../modals/LoadingModal";
import { Blog } from "../../Types/Blog-Data-types";
import NewestWrapper from "../shared/components/UIElements/Newest-Wrapper";
import XLBlogCard from "./XlBlogCard";

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

    


    return(
    <>

 

  <NewestWrapper 
  items={data}
  renderLeft={(blog) => (<XLBlogCard blog={blog}/>)} title="Newest Blogs" url={'/blogs'}>
 
  
 {(blogs) => ( <Blogs blogs={blogs} loading={loading}/> )  } 
 
  </NewestWrapper>

    
    </>
    )
}