import { useParams } from 'react-router-dom'
import './list.css'
import '../blogs.css'
import { useState,useEffect } from 'react'
import BlogItem from '../blogcomponents/blogitem'
import LoadingModal from '../../../modals/LoadingModal'
import image from '../../../../assets/images/Return.svg'
import { useNavigate } from 'react-router-dom'
export default function CategoriesList(){
const {categoryName} = useParams()
 const [blogs,setBlogs] = useState(null)
 const [loading,setLoading] = useState(false)

   const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
 useEffect(()=> {
    async function getCategories(){
         setLoading(true)
         try{
           const res = await fetch(`${API_URL_BLOGS}Categories/${categoryName}`)
     
        const result = await res.json()
        setBlogs(result)
         }catch(e){
          console.log(e)
          setBlogs([])
         } finally{
             setLoading(false)
         }
        

        
         
    }
    
    getCategories()
   
 },[])

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);
 const Nav = useNavigate()


 function PrevPage(){
    Nav(-1)
}

    return(
        <>
        <div className='list-container'>
            
           <div className='header-wrapper'>
                      
            <h1 className='categories-h1'>
                {categoryName} Blogs
            </h1>
                       </div>
          
            <div className='category-list'>
            {loading && <div className='loading-modal'><LoadingModal/></div> }
      {!loading && blogs?.length > 0 && (
        <BlogItem 
           contentwrapper='content-wrapper'
          datewrapper='date-wrapper'
           data={blogs}
           articlewrapper="article-wrapper"
           blogtitle="Blog-title" 
           blogsection="item-section"
           bloglink='read-more'
           blogimage="blogs-image"
           blogarticle="blogs-article"
           blogdetails="blogs-details"
           date="blogs-date"
           category='blogs-category'
          />
      )}
         {!loading && blogs?.length === 0 && (<h1>No blogs for this category yet</h1>)}
          
        </div>
        </div>
        </>
    )
}