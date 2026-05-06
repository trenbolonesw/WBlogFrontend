import './Create.css'
import { useState,useRef,useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import CrudLoader from '../../modals/crud-loader'
import retry from '../../../assets/images/retry.svg'
import RichTextArea from '../../rich-text/richtextarea'
export default function CreateBlog(){

 
const templateImage = `https://www.mhs.mb.ca/docs/sites/images/russellelevator4.jpg`

 const[image,setImage] = useState(null)
 const [prev,setPrev] = useState(null)
 const [title,setTitle] = useState('')
 const [article,setArticle] = useState('')
 const [imageDescription,setImageDescription] = useState('')
 const [category,setCategory] = useState('')
 const [loading,setLoading] = useState(false)
 const [error,setError] = useState(false)
 const imageRef = useRef()
const navigate = useNavigate()
const auth = useContext(AuthContext)
 useEffect(() => {
  if(!image){
    return;
  }
  const fileReader = new FileReader()

   fileReader.onload = () => {
    setPrev(fileReader.result)
   }

   fileReader.readAsDataURL(image)
 },[image])

 function handleimage(){
   imageRef.current.click()
 }

 function SelectedHandler(event){
        let pickedImage;

        if(event.target.files || event.target.files.length === 1){

            pickedImage = event.target.files[0]

            setImage(pickedImage)

        }
 }

 
 const formData = new FormData()
 

 formData.append('title',title)
 formData.append('article',article)
 formData.append('ImageDescription',imageDescription)
 formData.append('Admin',auth.userId)
 formData.append('category',category)
 if(image){
 formData.append('image',image)
 }

 
const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
   async function postBlog(e){
    e.preventDefault()
      try{
    setLoading(true)
    const response = await fetch(`${API_URL_BLOGS}createBlog`,{method:'POST',
      headers:{
        'Authorization':'Bearer '+ auth.token},
      body:formData})
     
    
   if(!response.ok){
    throw new Error('failed to post,please try again')
   }
    
   const result = await response.json()
   
   console.log(result)
   auth.setCreateModal(true)
   navigate('/Blogs')
   setLoading(false)
  }catch(e){
     setError(true)
     

       
      } finally{
            setLoading(false)
      }
   
    }

   useEffect(() => {
  const handleFocus = (e) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach((el) => el.addEventListener('focus', handleFocus));

  return () => {
    inputs.forEach((el) => el.removeEventListener('focus', handleFocus));
  };
}, []);

 


//const articleLength = 3500;
  // <div className='char-counter'>{article.length < articleLength ? <p>{article.length}/{articleLength}</p>:<p>character limit reached!</p>}</div>

  function clearField(){
   setArticle(' ')
 }
 function handlechange(e){
  setArticle(e.target.value)
 }
    


    return(
        <>
        <div className='blog-structure'>
           <div className='blog-wrapper'>
               <h1 className='new-blog'>Create Blog</h1>
            <form className='blog-form' onSubmit={postBlog}>
         <input onChange={(e) => setTitle(e.target.value)} className='new-blog-title' type="text" placeholder="Title"/>
          <input
         className='image-input' 
         type="file"
         ref={imageRef}
         onChange={SelectedHandler}
         accept=".jpeg,.jpg,.png,.webp"
         />
         {!prev && <img className='blog-image' src={templateImage}height={200} width={250}/>}
         {prev &&  <img className='blog-image' src={prev} height={200} width={250} />}
          <button onClick={handleimage} type='button' className='image-button'>Select an image</button>
         
        <textarea onChange={(e) => setImageDescription(e.target.value)}  rows={5} className='blog-description' type="text" placeholder="Image Description"/>
        
         
          <RichTextArea onChange={(e) => setArticle(e.target.value)} clear={clearField} handleclear={handlechange} className='TextArea-mobile' />
          <RichTextArea className="TextArea-pc" onChange={(value) => setArticle(value)} clear={clearField} handleclear={handlechange}/>
          
          

          <select className='selection-wrapper' onChange={(e) => setCategory(e.target.value)}>
            <option className='option'>Select a Category</option>
            <option value="Exploration">Exploration</option>
            <option value="History">History</option>,
            <option value="Photography">Photography</option>
            <option value="test">Test</option>
          </select>

              {loading && <CrudLoader/>}
              {error && !loading &&(
                 <>
                <p>failed to post, please try again</p>
          <button type='submit' className='retry'><img src={retry}/></button>

          </>
              )}
              {!loading && !error && (
                <button type='submit' className='post'>Post</button>
              )}
        
        
          </form>
          </div>
          </div>
        </>
    )
}