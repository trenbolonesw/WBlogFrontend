import '../../Components/AdminComponents/imagehandler.css'
import { useRef,useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Components/shared/context/auth-context'
import { useContext } from 'react'
import '../../Components/AdminComponents/auth.css'
import ImagePicker from '../../Components/shared/components/ImagePicker/Imager-Picker'
export default function SignIn(){
const auth = useContext(AuthContext)
    const API_URL= import.meta.env.VITE_ADMIN_URL
 const navigate = useNavigate()

    const [image,setImage] = useState<Blob|null>(null)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
  async function submitHandler(event){
    event.preventDefault()
   
         const formData = new FormData()

    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)

  if(image){
  formData.append('image',image)
  }

     try{
     const res= await fetch(`${API_URL}signin`,{
        method:"POST",
        body:formData
    
    })  
    const result = await res.json()
    if(!res.ok){
         setError(true)
        
    } else{
        console.log(result.token)
        auth.login(result.userId,result.token)
        setSuccess(true)
         const id = result.userId
  navigate(`/g10mtK/${id}`)
    }
   
    
     }catch(e){
        console.log(e)
     }


 }
  

    return(
        <>
        {error && <h1>something went wrong..</h1>}
        <form className='form' onSubmit={submitHandler}>
            <label>UserName</label>
            <input type="text" placeholder="noobmaster" className='input' 
            onChange={(e) => setName(e.target.value)}/>
             <label>Email</label>
            <input type="text" placeholder="example@gmail.com" className='input'
            onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input placeholder="password" type="password" className='input'
             onChange={(e) => setPassword(e.target.value)}
            />
               <ImagePicker setImage={setImage} image={image}/> 
        <button>Create Admin</button>
        </form>
        {success && <h1>Success!</h1>}
        </>
    )
}

