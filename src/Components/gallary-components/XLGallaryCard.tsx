import { Gallary } from "../../Types/Blog-Data-types"
import styles from '../blogcomponents/xlblogcard.module.css'
import { Link } from "react-router-dom"
import { DateFormatter } from "../shared/utils/dateFormater"
type GalleryItems = {
    Gallary:Gallary;
    onClick:()=>void
}

export default function XLGallaryCard({onClick,Gallary}:GalleryItems){



 


  
 

 return(
    <>
        
  
            <section onClick={onClick}  className={styles.itemSection} key={Gallary._id}>
             
              
                 
                <img className={styles.blogsImage} src={Gallary.Image}/>
                <div className={styles.contentWrapper}>
                  <div className={styles.articleWrapper} >
            <strong className="blog-title">{Gallary.title}</strong>
           </div>
             
             <div className={styles.dateWrapper}>
              <span className={styles.blogsDate}>{DateFormatter(Gallary.created_at)}</span>
              
               <div className={styles.blogsCategory}>{Gallary.category}</div>
               </div>
            
              </div>
        
   
           </section>
            
    </>
 )
}