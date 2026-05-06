import { useState } from 'react'
import './Image-Gallery.css'
import dayjs from 'dayjs'
export default function Images({Gallery}){

const [fullSizeId, setFullSizeId] = useState(null);



 if (!Gallery) {
    return <p>Loading gallery...</p>
  } 
   


    function formatDate(date){
         const time = dayjs(date).format('MMMM DD, YYYY')
  
  
         return time
    }







 return(
    <>
    
    <div className="image-gallery">
      {Gallery.map(data => (
      <div key={data._id} className="image-card">
       
        <img title={` ${fullSizeId === data._id ?'click away to shrink': 'click for full size'}`} onClick={() => setFullSizeId(data._id)} src={data.Image} className={`${fullSizeId === data._id ?  'full-size':'gallery-image'}`}/>
         {fullSizeId === data._id && <div className="image-backdrop" onClick={() => setFullSizeId(null)} />}
        <div className='text-wrapper'>
        <div className={`${fullSizeId === data._id ?'':'details-wrapper'}`}>
        
        <div className='info-card'>
        <p className="url-image-title">{data.title}</p>
        <div className='date-category'>
        <p className="url-image-date">{formatDate(data.created_at)}</p>
        <p className='url-image-category'>{data.category}</p>
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