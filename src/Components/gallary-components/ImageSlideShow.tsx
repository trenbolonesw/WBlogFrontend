import Lightbox from 'yet-another-react-lightbox';
import { Gallary } from '../../Types/Blog-Data-types';
import { useState } from 'react';

import {Captions,Download, Fullscreen,Zoom,Thumbnails} from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Images from '../../Mainpages/Image-Gallary/Images';
type SlideProps = {
    GallaryData:Gallary[],

}
export default function ImageSlideShow({GallaryData}:SlideProps){
        const [index,setIndex] = useState<number>(0)    
     const [open,setOpen] = useState<boolean>(false)
      
     function openGallary(index:number){
       setIndex(index)
       setOpen(true)
     }
    
    const slides = GallaryData.map((item) => ({
        src:item.Image ?? "",
        title:item.title,
        description:item.category
    }))
    

    return(
        <>
         {/* <button onClick={()=> setOpen(true)}>open</button>
          */}
     <Lightbox plugins={[Captions,Download,Fullscreen,Zoom,Thumbnails]} captions={{
                        showToggle:true,
                        descriptionTextAlign:'end'
                    }} open={open} slides={slides} close={() => setOpen(false)}
                  index={index}
                    />
                     
                    <Images gallary={GallaryData} onclick={(index) => openGallary(index)}/>
                    
        </>
    )
}