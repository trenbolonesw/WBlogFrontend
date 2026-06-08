import styles from './xlblogcard.module.css'
import { Link } from "react-router-dom"

import { DateFormatter } from '../shared/utils/dateFormater'
import { Blog } from "../../Types/Blog-Data-types"
import './blogitem'

interface BlogItems{
blog:Blog,
}


export default function XLBlogCard({blog}:BlogItems){



 


  
 

 return(
    <>
        
  
            <section className={styles.itemSection} key={blog._id}>
             
                <Link to={`blogs/${blog._id}`} className={styles.readMore}>
                 
                <img className={styles.blogsImage} src={blog.Image}/>
                <div className={styles.contentWrapper}>
                  <div className={styles.articleWrapper} >
            <strong className={styles.blogTitle}>{blog.title}</strong>
              <div className={styles.blogDetails}>
              <p className={styles.blogsArticle} dangerouslySetInnerHTML={{__html:blog.article}}></p>
              </div>
           </div>
             
             <div className={styles.dateWrapper}>
              <span className={styles.blogsDate}>{DateFormatter(blog.created_at)}</span>
              
               <div className={styles.blogsCategory}>{blog.category}</div>
               </div>
            
              </div>
        
         </Link>
           </section>
          
    </>
 )
}