import '../../Components/AdminComponents/imagehandler.css'
import { useRef,useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Components/shared/context/auth-context'
import { useContext } from 'react'
import '../../Components/AdminComponents/auth.css'
import ImagePicker from '../../Components/shared/components/ImagePicker/Imager-Picker'
import {SignInSchema} from "../../models/userSchema"
import z from "zod"
import {SubmitHandler,useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import AuthWrapper from "../../Components/shared/components/UIElements/auth-wrapper";
import { Input } from "../../Components/shared/components/FormElements/Input";
import { HttpHook } from '../../Components/shared/hooks/http-hook'
export default function SignIn(){
 type UserArray = z.infer<typeof SignInSchema>
  const {
    setValue,
    control,
 register,
 handleSubmit,
 formState:{errors}
  } = useForm<UserArray>({
    resolver:zodResolver(SignInSchema)
  })

    const [image,setImage] = useState<Blob|null>(null)
   

   


useEffect(() => {
  if(image){

  setValue('image',image,{shouldValidate:true,shouldDirty:true})
  }
 },[setValue,image])

        
  



 
const navigate = useNavigate()

 
const {isLoading,error,SendRequest} = HttpHook()


 const API_URL= import.meta.env.VITE_ADMIN_URL

 const auth = useContext(AuthContext)
const onSubmit:SubmitHandler<UserArray> = async(data) => {
 try{
           const formData = new FormData()

    formData.append('name',data.userName)
    formData.append('email',data.email)
    formData.append('password',data.password)
  formData.append('image',data.image)
  

        const response = await SendRequest(`${API_URL}signin`,
          'POST',
       formData,
    
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
        <AuthWrapper title='Sign Up' error={error} loading={isLoading} onSubmit={handleSubmit(onSubmit)}>
           
            <Input error={errors.userName?.message} type="text" placeHolder="noobmaster"
            register={{...register("userName")}}/>
            
            <Input error={errors.email?.message} type="text" placeHolder="example@gmail.com" 
            register={{...register('email')}}
            />
           
            <Input error={errors.password?.message} placeHolder="password" type="password" 
              register={{...register('password')}}
            />
               <ImagePicker error={error} setImage={setImage} image={image}/> 
    </AuthWrapper>
        </>
    )
}

