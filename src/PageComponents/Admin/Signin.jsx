import './imagehandler.css'
import { useRef,useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import { useContext } from 'react'
import './auth.css'
export default function SignIn(){
const auth = useContext(AuthContext)
    const API_URL= import.meta.env.VITE_ADMIN_URL
 const navigate = useNavigate()

    const [file,setFile] = useState()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [prevUrl,setPrevUrl] = useState()
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
  async function submitHandler(event){
    event.preventDefault()
   
         const formData = new FormData()

    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)

  if(file){
  formData.append('image',file)
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

    const fileRef = useRef()

    useEffect(()  => {
        if(!file){
            return;
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setPrevUrl(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    },[file])

    

    function handleImage(){
      fileRef.current.click();
    }

 function pickedHandler(event){
    let pickedFile;
      
    if(event.target.files && event.target.files.length === 1){
         
        pickedFile = event.target.files[0]

        setFile(pickedFile)

        
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
                <div className="prev-image">
            <input 
            ref={fileRef}
            onChange={pickedHandler}
            className="FileInput" type="file" 
            accept=".jpeg,.jpg,.png,.webp"/>
            {prevUrl && <img src={prevUrl} height={200} width={250}/>}
            {!prevUrl && <p>please choose an image</p>}
            <button type="button" onClick={handleImage}>choose a profile image</button>
        </div>
        <button>Create Admin</button>
        </form>
        {success && <h1>Success!</h1>}
        </>
    )
}

