import './Create.css'
import { useState,useRef,useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import CrudLoader from '../../modals/crud-loader'

export default function NewGalary(){

const templateImage = `https://www.mhs.mb.ca/docs/sites/images/russellelevator4.jpg`

const[image,setImage] = useState(null)
 const [prev,setPrev] = useState(null)
 const [title,setTitle] = useState('')
const [category,setCategory] = useState('')
 const [loading,setLoading] = useState(false)
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
 formData.append('Admin',auth.userId)
 formData.append('category',category)

 if(image){
 formData.append('image',image)
 }

const API_URL_GALLERY = import.meta.env.VITE_GALLERY_URL

async function postGallery(e){
    e.preventDefault()
      try{
    setLoading(true)
    const response = await fetch(`${API_URL_GALLERY}addPhotos`,{method:'POST',
      headers:{
        'Authorization':'Bearer '+ auth.token},
      body:formData})
     
    
   if(!response.ok){
   console.log(e)
   }

  const result = await response.json()
console.log('RAW RESPONSE:', result)

  
   auth.setCreateModal(true)
   navigate('/Gallery')
   setLoading(false)
  
  }catch(e){
   console.error(e)
        
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




    return(
        <>
         <div className='blog-structure'>
           <div className='blog-wrapper'>
               <h1 className='new-blog'>Create Galary</h1>
            <form className='blog-form' onSubmit={postGallery}>
         <input onChange={(e) => setTitle(e.target.value)} className='new-blog-title' type="text" placeholder="Title"/>
          <input
         className='image-input' 
         multiple
         type="file"
         ref={imageRef}
         onChange={SelectedHandler}
         accept=".jpeg,.jpg,.png,.webp"
         />
         {!prev && <img className='blog-image' src={templateImage}height={200} width={250}/>}
         {prev &&  <img className='blog-image' src={prev} height={200} width={250} />}
          <button onClick={handleimage} type='button' className='image-button'>Add Your Image</button>
          <select className='selection-wrapper' onChange={(e) => setCategory(e.target.value)}>
            <option className='option'>Select a Category</option>
            <option value="Exploration">Exploration</option>
            <option value="History">History</option>,
            <option value="Photography">Photography</option>
          </select>
        {loading ? <CrudLoader/> :  <button type='submit' className='post'>Create Gallery!</button>}
          </form>
          </div>
          </div>
        </>
    )
}