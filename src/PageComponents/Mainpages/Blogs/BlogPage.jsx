import { useParams } from 'react-router-dom'
import './blogPage.css'
import { useState,useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingModal from '../../modals/LoadingModal'
import dayjs from 'dayjs'
import { AuthContext } from '../../../context/auth-context'
import BlogOptions from '../../Admin/AdminControls/BlogOptions'
import shareImg from '../../../assets/images/share-icon.png'
import { Helmet } from 'react-helmet-async';

//for later 
// import { useLocation } from "react-router-dom";

// const location = useLocation();

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, [location]);
export default function BlogPage(){
    
   const[BlogData,setBlogData] = useState(null)
   const [meta, setMeta] = useState({});
    const auth = useContext(AuthContext)
const {id} = useParams()
const navigate = useNavigate()

const toTopRef = useRef(null)


useEffect(() => {
  if (toTopRef.current) {
    toTopRef.current.scrollIntoView();
  }
},[])


 useEffect(() => {
    fetch(`https://blogsite-a144e.firebaseapp.com/meta/${id}`)
      .then(r => r.json())
      .then(setMeta);
  }, [id]);

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


  function Back(){
   navigate(-1)
  }

  
  function formatDate(date){
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
              <Helmet>
        <title>{meta.title}</title>
        {/* <meta name="description" content={meta.description} /> */}
        <meta property="og:title" content={meta.title} />
        {/* <meta property="og:description" content={meta.description} /> */}
        <meta property="og:image" content={meta.Image} />
      </Helmet>
           
        
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