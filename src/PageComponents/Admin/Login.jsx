import { useState,useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import './auth.css'

import { useNavigate } from 'react-router-dom'
import CrudLoader from '../modals/crud-loader'
export default function Login(){
  const auth = useContext(AuthContext)
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
       const [load,setLoad] = useState(false)
        const [error,setError] = useState(false)
   
   const Navigate = useNavigate()

  
   const API_URL= import.meta.env.VITE_ADMIN_URL
    

     async function LoginHandler(e){
        e.preventDefault()
       
        try{
              setLoad(true)
       
        const response = await fetch(`${API_URL}login`,
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                email:email,
                password:password
            },
        ),
        }
        )
         const result = await response.json()
        
         if(!response.ok){
           throw new Error("error")
        }
       
         
        console.log(result.token)

      auth.login(result.userId,result.token)

        const id = result.userId
            Navigate(`/g10mtK/${id}`)
         setLoad(false)
      
      }catch(e){
        console.log(e)
           setError(true)
            throw new Error('login failed!')
         
        } finally{
            setLoad(false)
      }
     }



    return(
        <div className='login-page'>
        <form className='form' onSubmit={LoginHandler}>
             <label>Email</label>
            <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="example@gmail.com" className='input'/>
            <label>Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} placeholder="password" type="password" className='input'/>
           {load && <CrudLoader/>}
           {error && !load && (
            <>
              <p>failed to post, please try again</p>
            <button type='submit' className='retry'>Retry</button>
            </>
           )}
              {!load && !error && (
                   <button type='submit'>Login</button>
              )}
        
        </form>
        </div>
    )
}