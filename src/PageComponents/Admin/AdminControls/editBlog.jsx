import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../context/auth-context"
import CrudLoader from "../../modals/crud-loader"
import '../AdminControls/Create.css'
export default function EditBlog(){
const [Blog,setBlog] = useState(null)
const[newTitle,setNewTitle] = useState('')
const[newArticle,setNewArticle] = useState('')
const[newImageDescription,setNewDescription] = useState('')
 const [loading,setLoading] = useState(false)
const [error,setError] = useState(false)


const auth = useContext(AuthContext)



const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
const ADMIN = import.meta.env.VITE_ADMIN_URL

const {id} = useParams()
const navigate = useNavigate()

useEffect(() => {
 async function GetBlogs(){
   const response = await fetch(`${API_URL_BLOGS}${id}`
    ,{method:'GET',
  'Content-Type': 'application/json'
    })

    const result = await response.json()

    setBlog(result.blog)
       

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
         setLoading(true)
       const response = await fetch(`${API_URL_BLOGS}updateBlog/${id}`,
        {method:"PATCH",
     headers:{'Authorization':"Bearer " + auth.token,
              
     },
     body:formData, 
    })
            
       if(!response.ok){
        setError(true)
      throw new Error('update failed!')
      
  } else{
    setLoading(false)
     navigate(`/Blogs/${id}`)
  }
     }catch(e){
            console.log(e)
        }
}

const maxChar = 3500;

  
    return(
        <>
        {error && <p>update failed</p>}
        <div className="blog-structure">
          <div className="title-wrapper"><h2 className="edit-blog">Edit Blog</h2></div>
        <form className="blog-form" onSubmit={MyBlog}>
            <label className="title-label">Title</label>
            <input className='new-blog-title' name="title" value={newTitle}  onChange={handleInputChange} type="text"/>
            <label className="image-label">Image Description</label>
                      <input className='blog-description' name="ImageDescription" value={newImageDescription} onChange={handleInputChange} type="text"/>
            
            <label className="article-label">Article</label>
             <div className='char-counter'>{newArticle.length < maxChar ? <p>{newArticle.length}/{maxChar}</p>:<p>character limit reached!</p>}</div>
                 <textarea className="TextArea-mobile"  maxLength={1500} rows={20} name="article" value={newArticle} onChange={handleInputChange} type="text"/>
                   <textarea className="TextArea-pc"  maxLength={1500} rows={20} name="article" value={newArticle} onChange={handleInputChange} type="text"/>
                 
                     {loading ? <CrudLoader/> : <button className="post">Edit!</button>}
        </form>
        </div>
        </>
    )
}