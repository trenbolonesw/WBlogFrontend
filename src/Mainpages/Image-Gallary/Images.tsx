import { useState } from 'react'
import './Image-Gallery.css'
import { DateFormatter } from '../../Components/shared/utils/dateFormater';
import { Gallary } from '../../Types/Blog-Data-types'

type GallaryPhotos = {
  gallary:Gallary[]
}
export default function Images({gallary}:GallaryPhotos){

const [fullSizeId, setFullSizeId] = useState(null);

console.log(gallary)

 if (!gallary) {
    return <p>Loading gallery...</p>
  } 
   








 return(
    <>
    
    <div className="image-gallery">
      {gallary.map((data:Gallary) => (
      <div key={data._id} className="image-card">
       
        <img title={` ${fullSizeId === data._id ?'click away to shrink': 'click for full size'}`}  src={data.Image} className={`${fullSizeId === data._id ?  'full-size':'gallery-image'}`}/>
         {fullSizeId === data._id && <div className="image-backdrop" onClick={() => setFullSizeId(null)} />}
        <div className='text-wrapper'>
        <div className={`${fullSizeId === data._id ?'':'details-wrapper'}`}>
        
        <div className='info-card'>
      
        <div className='date-category'>
        
        </div>
        </div>
        </div>
        </div>
      </div>
    ))}
  
    </div>
    </>
 )
}