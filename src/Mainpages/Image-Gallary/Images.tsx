
import './Image-Gallery.css'
import { DateFormatter } from '../../Components/shared/utils/dateFormater';
import { Gallary } from '../../Types/Blog-Data-types'

type GallaryPhotos = {
  gallary:Gallary[],
  onclick: (index:number) => void
}
export default function Images({gallary,onclick}:GallaryPhotos){



console.log(gallary)

 if (!gallary) {
    return <p>Loading gallery...</p>
  } 
   

  function handleimageclick(index:number){
      onclick(index)
        }






 return(
    <>
    
    <div className="image-gallery">
      {gallary.map((data:Gallary,index) => (
      <div key={index} className="image-card" onClick={() => handleimageclick(index)}>
       
        <img src={data.Image} className='gallery-image'/>
        <div className='text-wrapper'>
      
       
        </div>
      </div>
    ))}
  
    </div>
    </>
 )
}