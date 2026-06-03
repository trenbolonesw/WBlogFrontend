import { useParams } from 'react-router-dom'
import './list.css'
import '../../../Components/blogcomponents/blogs.css'
import { useState,useEffect } from 'react'
import BlogItem from '../../../Components/blogcomponents/blogitem'
import LoadingModal from '../../../Components/modals/LoadingModal'
import Pagination from '../../../Components/shared/components/Pagination/Pagination'
import { Blog } from '../../../Types/Blog-Data-types'
import { useSearchParams } from 'react-router-dom'
export default function CategoriesList(){
const {categoryName} = useParams()
 const [blogs,setBlogs] = useState<Blog[]>([])
 const [pageCount,setPageCount] = useState<number>(0)
 const [loading,setLoading] = useState(false)


 const [searchParams,setSearchParams] = useSearchParams()
const currentPage = Number(searchParams.get("page") || 1 ) -1


   const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL



 useEffect(()=> {
    
    async function getCategories(){
         setLoading(true)
         try{
           const res = await fetch(`${API_URL_BLOGS}Categories/${categoryName}?page=${currentPage + 1}&limit=8`)
    
        const result = await res.json()



        setBlogs(result.blogs)
        setPageCount(result.totalPages)
         }catch(e){
          console.log(e)
          setBlogs([])
         } finally{
             setLoading(false)
         }
        

        
         
    }
    
    getCategories()
   
 },[API_URL_BLOGS,categoryName,currentPage])

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);
 



    return(
        <>
        
        <div className='list-container'>
            <Pagination searchParams={searchParams} setSearchParams={setSearchParams} pageCount={pageCount}/>
           <div className='header-wrapper'>
                      
            <h1 className='categories-h1'>
                {categoryName} Blogs
            </h1>
                       </div>
          
            <div className='category-list'>
            {loading && <div className='loading-modal'><LoadingModal/></div> }
      {!loading && blogs?.length > 0 && (
        <BlogItem 
           Blogs={blogs}
          />
      )}
         {!loading && blogs?.length === 0 && (<h1>No blogs for this category yet</h1>)}
          
        </div>
        
        </div>
        </>
    )
}