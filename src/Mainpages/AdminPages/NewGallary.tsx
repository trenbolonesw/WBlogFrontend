import './Create.css'
import { useState,useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Components/shared/context/auth-context'
import Button from '../../Components/shared/components/FormElements/Button'
import CrudLoader from '../../Components/modals/crud-loader'
import ImagePicker from '../../Components/shared/components/ImagePicker/Imager-Picker'
import { Input } from '../../Components/shared/components/FormElements/Input'
import { HttpHook } from '../../Components/shared/hooks/http-hook'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm,SubmitHandler} from 'react-hook-form'
import { GallarySchema } from '../../models/GallaryModal'
import {z} from 'zod'
export default function NewGalary(){

 type Gallary = z.infer<typeof GallarySchema>

 const {
  setValue,
  register,
  handleSubmit,
  formState:{errors}
 } = useForm<Gallary>(
  {resolver:zodResolver(GallarySchema)}
 )
 


  const navigate = useNavigate()
const auth = useContext(AuthContext)
 


 const {SendRequest,isLoading,error} = HttpHook()
 
 
 const [image,setImage] = useState<Blob|null>(null)



useEffect(() => {
  if (image) {
    setValue('image', image, {
      shouldValidate: true,
      shouldDirty: true
    });
  }
}, [image, setValue]);


const API_URL_GALLERY = import.meta.env.VITE_GALLERY_URL


const onSubmit: SubmitHandler<Gallary> = async(data) => {
  if(isLoading) return;
     console.log(errors.image?.message)

 
const formData = new FormData() 

   formData.append('title',data.title)
   formData.append('Admin',auth.userId)
   formData.append('category',data.category)

    if(image){
    formData.append('image',image)
    }  
  try{
   await SendRequest(`${API_URL_GALLERY}addPhotos`,'POST',formData,{'Authorization':'Bearer '+ auth.token})   
   auth.setCreateModal(true)
  
   navigate('/Gallery')
  
  }catch(e){
   console.error(e)
        
      }

} 

   useEffect(() => {
  const handleFocus = (e:Event) => {
    setTimeout(() => {
      const target = e.target as HTMLElement
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            <form className='blog-form' onSubmit={handleSubmit(onSubmit)}>
         <Input error={errors.title?.message} className='new-blog-title' register={{...register('title')}}  type="text" placeHolder="title"/>
          <ImagePicker error={errors.image?.message} setImage={setImage} image={image}/>
          
          <select className='selection-wrapper' {...register('category')}>
            <option className='option' value=''>Select a Category</option>
            <option value="Exploration">Exploration</option>
            <option value="History">History</option>,
            <option value="Photography">Photography</option>
          </select>
          {errors.category && errors.category?.message}

          {error && <p>Failed to Post</p>}
        {isLoading ? <CrudLoader/> :  <Button type='submit' cssClass='post'>Create Gallery!</Button>}
          </form>
          </div>
          </div>
        </>
    )
}