import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../Components/shared/context/auth-context'
import CrudLoader from "../../Components/modals/crud-loader"
import { HttpHook } from "../../Components/shared/hooks/http-hook"
import './Create.css'
export default function EditBlog(){
const [Blog,setBlog] = useState(null)
const[newTitle,setNewTitle] = useState('')
const[newArticle,setNewArticle] = useState('')
const[newImageDescription,setNewDescription] = useState('')

const {isLoading,error,SendRequest} = HttpHook()

const auth = useContext(AuthContext)



const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
const ADMIN = import.meta.env.VITE_ADMIN_URL

const {id} = useParams()
const navigate = useNavigate()

useEffect(() => {
 async function GetBlogs(){
   const response = await SendRequest(`${API_URL_BLOGS}${id}`)
    
    setBlog(response.blog)
       

 }
 GetBlogs()
},[API_URL_BLOGS,id])


useEffect(() => {
  if (Blog) {
    setNewTitle(Blog.title || '');
    setNewArticle(Blog.article || '');
    setNewDescription(Blog.ImageDescription || '');
  }
}, [Blog]);


if(!Blog){
    return <p>nothing..</p>
}

function handleInputChange(e) {
  const { name, value } = e.target;

  if (name === 'title') {
    setNewTitle(value);
  } else if (name === 'article') {
    setNewArticle(value);
  } else if (name === 'ImageDescription') {
    setNewDescription(value);
  }
}



    async function MyBlog(e){
        e.preventDefault()
  const formData = new FormData()
         formData.append('title',newTitle)
 formData.append('article',newArticle)
 formData.append('ImageDescription',newImageDescription)

        try{
        
       await SendRequest(`${API_URL_BLOGS}updateBlog/${id}`,
      "PATCH",
      formData,
     {'Authorization':"Bearer " + auth.token}
    )
            
    
    
     navigate(`/Blogs/${id}`)
  
     }catch(e){
            console.log(e)
        }
}

  
    return(
        <>
        <div className="blog-structure">
          <div className="title-wrapper"><h2 className="edit-blog">Edit Blog</h2></div>
        <form className="blog-form" onSubmit={MyBlog}>
            <label className="title-label">Title</label>
            <input className='new-blog-title' name="title" value={newTitle}  onChange={handleInputChange} type="text"/>
            <label className="image-label">Image Description</label>
                      <input className='blog-description' name="ImageDescription" value={newImageDescription} onChange={handleInputChange} type="text"/>
            
            <label className="article-label">Article</label>
  
                 <textarea className="TextArea-mobile"  maxLength={1500} rows={20} name="article" value={newArticle} onChange={handleInputChange} type="text"/>
                   <textarea className="TextArea-pc"  maxLength={1500} rows={20} name="article" value={newArticle} onChange={handleInputChange} type="text"/>
                     {error && <p>something went wrong</p>}
                     {isLoading ? <CrudLoader/> : <button className="post">Edit!</button>}
        </form>
        </div>
        </>
    )
}