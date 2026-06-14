import { Link } from "react-router-dom"
import styles from './regularblogcard.module.css'
import { Blog } from "../../Types/Blog-Data-types"
import './blogitem'
import { DateFormatter } from "../shared/utils/dateFormater"

interface BlogItem{
Blogs:Blog[]
}

export default function RegularBlogCard({Blogs}:BlogItem){



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
              <div className={styles.blogsCategory}>{blog.category}</div>
              <span className={styles.blogsDate}>{DateFormatter(blog.created_at)}</span>
              
               
               </div>
            
              </div>
        
         </Link>
           </section>
            ))}
            </>
    )
}