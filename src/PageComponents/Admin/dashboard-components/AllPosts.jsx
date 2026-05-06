import { useState,useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import DeletedModal from "../../modals/DeletedModal"
import { AuthContext } from "../../../context/auth-context"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import './post.css'
export default function AllPosts(){
const {id} = useParams()
      const auth = useContext(AuthContext)
     const [blogInfo,setBlogInfo]  = useState({blogs:[]})  
 const [options,setOPtions] = useState(false)
    const [confirm,setConfirm] = useState(false)
  
const API_URL_BLOGS= import.meta.env.VITE_BLOGS_URL

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
  },[API_URL_BLOGS])
  
 function getTime(date){
        const formattedDate = dayjs(date).format(' MMMM DD/YYYY') 
        return formattedDate
            }

  function showconfirm(id){
            setConfirm(prev => prev === id ? null :id)
          }
            function showOptions(id){
                setOPtions(prev => prev === id ? null:id)
            }
  

   async function DeleteBlog(id){
                try{

                
                     const res = await fetch(`${API_URL_BLOGS}${id}`,
                        {method:'DELETE',
                            headers:{
                                authorization:'Bearer '+ auth.token
                            }
                        }
                     )
                     if(!res.ok){
                        console.log('deletion failed!')
                        return;
                     }

                     setBlogInfo(prev => ({
                        blogs:prev.blogs.filter(blog => blog.id !== id)
                     }))
                        auth.setDeleteModal(true)

                     }catch(e){
                    throw new Error('failed!')
                }
            }
            DeleteBlog(id)
  
       

    return(
        <>
        <div className="posts-page">
            <div className="vh-wrapper">
            {blogInfo.blogs.length < 1 && <p>no posts yet!</p>}
        {blogInfo.blogs.map((info) => (
                    <>
                    
                    <section key={info} className="blog-titles">
                        
                    <Link to={`/blogs/${info.id}`} className="title-links">
                  
                        {info.title}
                        <p className="blog-date">{getTime(info.createdAt)}</p>
                     
                    </Link>
                    <span className="Options" onClick={() => showOptions(info.id)}>...</span>
                    {options === info.id && <div className="options-menu"> 
                        <Link to={`/EditBlog/${info.id}`}>edit</Link> 
                        <p onClick={() => showconfirm(info.id)}>delete</p>
                        {confirm === info.id && <div><p>are you sure?</p>
                        <button onClick={() => DeleteBlog(info.id)}>delete</button>
                        <button onClick={showconfirm}>cancel</button>
                        </div>}
                        <button onClick={() => showOptions(info.id)}>close</button>
                    
                    </div>}
                    </section>
                    
                    </>
                   ))}
                   <DeletedModal/>
                   </div>
                   </div>
        </>
    )
}