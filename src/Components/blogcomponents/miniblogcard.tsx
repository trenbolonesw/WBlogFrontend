import { Link } from "react-router-dom"
import dayjs from "dayjs"
import styles from './miniblogcard.module.css'
import { Blog } from "../../Types/Blog-Data-types"
import './blogitem'
import { DateFormatter } from "../shared/utils/dateFormater"

interface BlogItem{
Blogs:Blog[]
}

export default function MiniBlogCard({Blogs}:BlogItem){



    return(
        <>
        {Blogs.map((blog:Blog) => (
            <section className={styles.itemSection} key={blog._id}>
             
                <Link to={`/Blogs/${blog._id}`} className={styles.readMore}>
                 
                <img className={styles.blogsImage} src={blog.Image}/>
                <div className={styles.contentWrapper}>
                  <div className={styles.articleWrapper} >
            <strong className="blog-title">{blog.title}</strong>
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
            ))}
            </>
    )
}