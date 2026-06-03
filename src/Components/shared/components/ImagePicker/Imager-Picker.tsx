import {useEffect, useRef,useState} from 'react'
import  './image-picker.css'
import { ImagePickerProps } from '../../../../Types/shared-types'
export default function ImagePicker({image,setImage,error}:ImagePickerProps){


const [prev,setPrev] = useState<string|null>(null)
const templateImage = `https://www.mhs.mb.ca/docs/sites/images/russellelevator4.jpg`


 const imageRef = useRef<HTMLInputElement>(null)

   useEffect(() => {

    if(!image){
     return;
    }
        const fileReader = new FileReader()

        fileReader.onload = () => {
            if(typeof fileReader.result === 'string'){
            setPrev(fileReader.result)
            }
        }
     fileReader.readAsDataURL(image)

   },[image])

 function handleimage(){
    imageRef.current?.click()
 }

 function SelectedHandler(event:React.ChangeEvent<HTMLInputElement>){
   

        if(event.target.files && event.target.files.length === 1){

            const pickedImage = event.target.files?.[0]

            setImage(pickedImage)

        }
 
 }

 return(
        <>
        
          <input
         className='image-input' 
         multiple
         type="file"
         ref={imageRef}
         onChange={SelectedHandler}
         accept=".jpeg,.jpg,.png,.webp"
         />
        {!prev && <img className='blog-default-image' src={templateImage} />}
         {prev &&  <img className='blog-image' src={prev} />}
         <button onClick={handleimage} type='button' className='image-button'>Add Your Image</button>
         {error}
        </>
    )
}