import { useParams } from 'react-router-dom'
import './blogPage.css'
import { useState,useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingModal from '../../Components/modals/LoadingModal'
import dayjs from 'dayjs'
import { AuthContext } from '../../Components/shared/context/auth-context'
import BlogOptions from '../../Components/AdminComponents/BlogOptions'
import shareImg from '../../assets/images/share-icon.png'



export default function BlogPage(){
    
   const[BlogData,setBlogData] = useState (null)

    const auth = useContext(AuthContext)
const {id} = useParams()


const toTopRef = useRef(null)


useEffect(() => {
  if (toTopRef.current) {
    toTopRef.current.scrollIntoView();
  }
},[])




const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
const urlink = `https://blogsite-a144e.firebaseapp.com/Blogs/${id}`
   let url = `${API_URL_BLOGS}${id}`

       
         useEffect(() => {
           
            async function GetBlogPage(){
                 try{

              
               const res = await fetch(url)
                   if(!res.ok){
                    throw new Error('error!')
                   }
                const result = await res.json()
                setBlogData(result.blog)
                   }catch(e){
                    console.log(e)
                 }
            }
            
              GetBlogPage()
         },[url])

      if (!BlogData) return <div className='loading-modal'><LoadingModal/></div>; 


  
  
  function formatDate(date:Date){
       const time = dayjs(date).format('MMMM DD, YYYY')


       return time
  }

  async function shareLink() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "WBlog",
        text: "Take a look at this site",
        url: urlink
      });
    } catch (err) {
      console.log("Share cancelled or failed", err);
    }
  } else {
    alert("Sharing not supported on this browser");
  }
}
  
    return(
        <div className='blog-page'>

        
               <article className="blog">
               <span ref={toTopRef}></span>
                  <div className='blogdetails-wrapper'>
               <h3 className='category'>{BlogData.category}</h3>
                   
                <h1 className='blogtitle'>{BlogData.title}</h1>
                 <p className='date'>Posted on {formatDate(BlogData.created_at)}</p>
                 <button onClick={shareLink}><img src={shareImg} height={40}/></button>
                </div>
                
               

       
                <div className='blogimage-wrapper'>
               
                <img className="imgs" src={BlogData.Image}/>
                 <aside className='aside'>
             <p> {BlogData.ImageDescription}</p>
             <hr className='break-line'/>
             </aside>
                  </div>
               
               
                
                <p className='article' dangerouslySetInnerHTML={{__html:BlogData.article}}></p>
                 {auth.isLoggedIn && <BlogOptions id={id}/>}
               
                </article>
  
        </div>
    )
}