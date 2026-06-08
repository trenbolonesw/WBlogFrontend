import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Components/shared/context/auth-context"

import userSchema from "../../models/userSchema"
import z from "zod"
import {SubmitHandler,useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import AuthWrapper from "../../Components/shared/components/UIElements/auth-wrapper";
import { Input } from "../../Components/shared/components/FormElements/Input";
import { HttpHook } from "../../Components/shared/hooks/http-hook"


export default function AuthPage(){


//create switch state for login and signin in the future...



 type UserArray = z.infer<typeof userSchema>
  const {
    setValue,
    control,
 register,
 handleSubmit,
 formState:{errors}
  } = useForm<UserArray>({
    resolver:zodResolver(userSchema)
  })


 
const navigate = useNavigate()

 
const {isLoading,error,SendRequest} = HttpHook()


 const API_URL= import.meta.env.VITE_ADMIN_URL

 const auth = useContext(AuthContext)
const onSubmit:SubmitHandler<UserArray> = async(data) => {
 try{
      
        const response = await SendRequest(`${API_URL}login`,
          'POST',
          JSON.stringify({
            email:data.email,
            password:data.password
          }),
        {'Content-Type':'application/json'}
            )
           
        
          auth.login(response.userId,response.token)
          const id = response.userId
            navigate(`/g10mtK/${id}`)
          

  }catch(e){
    console.log(e)
      } 
}
 
return(
 <>

 <AuthWrapper title="Login" loading={isLoading} error={error}  onSubmit={handleSubmit(onSubmit)}>
        <Input error={errors.email?.message} register={{...register('email')}} placeHolder="Email"/>
        <Input error={errors.password?.message} register={{...register('password')}} placeHolder="Password"/>
 </AuthWrapper>

 </>
)
}