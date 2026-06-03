import './Create.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Components/shared/context/auth-context'
import CrudLoader from '../../Components/modals/crud-loader'
import retry from '../../assets/images/retry.svg'
import RichTextArea from '../../Components/rich-text/richtextarea.js'
import Button from '../../Components/shared/components/FormElements/Button'
import ImagePicker from '../../Components/shared/components/ImagePicker/Imager-Picker'
import { HttpHook } from '../../Components/shared/hooks/http-hook'
import {z} from 'zod'
import  {BlogSchema} from '../../models/blogSchema'
import {SubmitHandler,useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'
import { Input,TextArea } from '../../Components/shared/components/FormElements/Input'

export default function CreateBlog(){

  type BlogArray = z.infer<typeof BlogSchema>
  const {
    setValue,
    control,
 register,
 handleSubmit,
 formState:{errors}
  } = useForm<BlogArray>({
    resolver:zodResolver(BlogSchema)
  })
 



 
 const[image,setImage] = useState<Blob|null>(null)

 useEffect(() => {
  if(image){

  setValue('image',image,{shouldValidate:true,shouldDirty:true})
  }
 },[setValue,image])

 
const navigate = useNavigate()
const auth = useContext(AuthContext)
 
const {isLoading,error,SendRequest} = HttpHook()
const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL

 const onSubmit:SubmitHandler<BlogArray> = async(data) => {
      if(isLoading) return;
     setValue('image',image,{shouldValidate:true})
       console.log(errors.image?.message)
     const formData = new FormData()

        formData.append('title',data.title)
        formData.append('article',data.article)
        formData.append('ImageDescription',data.imageDescription)
        formData.append('Admin',auth.userId)
        formData.append('category',data.category)
        if(data.image){
        formData.append('image',data.image)
        }

            try{
         await SendRequest(`${API_URL_BLOGS}createBlog`,
          'POST',
          formData,
            { 'Authorization':'Bearer '+ auth.token}
        )
            
       
          auth.setCreateModal(true)
          
            navigate('/blogs')
          

  }catch(e){
    console.log(e)
      } 
 }



 





    return(
        <>
        <div className='blog-structure'>
           <div className='blog-wrapper'>
               <h1 className='new-blog'>Create Blog</h1>
            <form className='blog-form' onSubmit={handleSubmit(onSubmit)}>
         <Input error={errors.title?.message} placeHolder="title" register={{...register('title')}}  className='new-blog-title' type="text" />
    
         <ImagePicker image={image} setImage={setImage} error={errors.image?.message}/>
        <TextArea error={errors.imageDescription?.message} register={{...register('imageDescription')}}  rows={5} className='blog-description'  placeHolder="Image Description"/>
        
         <Controller
         name="article"
         control={control}
         render={({field,fieldState:{error}}) => (
          <div>
          <RichTextArea

          content={field.value}
          onChange={field.onChange}
          className="TextArea-pc"
          />
          {error && <p>{error.message}</p>}
          </div>
         )}
       />
         
        
          
          

          <select className='selection-wrapper' {...register('category')}>
            <option className='option' value=''>Select a Category</option>
            <option value="Exploration">Exploration</option>
            <option value="History">History</option>,
            <option value="Photography">Photography</option>
            <option value="test">Test</option>
          </select>
          {errors.category && errors.category.message}

              {isLoading && <CrudLoader/>}
              {error && !isLoading &&(
                 <>
                <p>failed to post</p>
          <Button type='submit' cssClass='retry'><img src={retry}/></Button>
          </>
              )}
              {!isLoading && !error && (
                <Button type='submit' cssClass='post' >Post</Button>
              )}
        
        
          </form>
          </div>
          </div>
        </>
    )
}