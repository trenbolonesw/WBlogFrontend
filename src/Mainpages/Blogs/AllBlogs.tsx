
import './allblogs.css'
import { useEffect, useState } from 'react'
import ItemWrapper from '../../Components/shared/components/UIElements/Item-wrapper'
import { useSearchParams } from 'react-router-dom'
import BlogFilter from '../../Components/blogcomponents/BlogFilter'
import Blogs from '../../Components/blogcomponents/blogs'
import { Blog } from '../../Types/Blog-Data-types'
import Pagination from '../../Components/shared/components/Pagination/Pagination'
import RegularBlogCard from '../../Components/blogcomponents/regular-size-card'
export default function AllBlogs(){
    
    const API_URL_BLOGS = import.meta.env.VITE_ALL_BLOGS_URL 
    

   const [searchParams,setSearchParams] =  useSearchParams();

  let category = searchParams.get("category")
        
 const currentPage = Number(searchParams.get("page") || 1 ) - 1 

     
    
    const [data,setData] = useState<Blog[]>([])

    const [loading,setLoading] = useState<boolean>(false);
          

     

// pagination logic here

// state to handle pagination

const [pageCount,setPageCount] = useState<number>(0)

    function handleCategory(value:string|null){
  const params: Record<string,string> = {};
  if(value) params.category = value;
  params.page = '1'
  setSearchParams(params)
    }



 useEffect(() => {
          async function getBlogs(){
       setLoading(true)


//change to 9 later
              let http = `${API_URL_BLOGS}filteredCategory?page=${currentPage + 1}&limit=8` 
                   
                 if(category){
                    http += `&category=${category}`

                 

                 }
             try{

                 const res = await fetch(http)
                 const result = await res.json();
                 
                 setData(result.blogs)
                 setPageCount(result.totalPages)
                 
    
             }catch(e){
            
                
                 console.log(e)
              
               
             } finally{
                setLoading(false)
             }
             
          }
          
          getBlogs()
       },[API_URL_BLOGS,category,currentPage])

   
    return(
        <>
            <ItemWrapper title="All Blogs">
                <BlogFilter category={category}  handleSearchParams={handleCategory}/>
                    
                  <Pagination searchParams={searchParams} setSearchParams={setSearchParams} pageCount={pageCount}/>
                    
                   <div className='allBlogs'>
                       <RegularBlogCard Blogs={data}/>
                     </div>
        </ItemWrapper>

        </>
    )
}