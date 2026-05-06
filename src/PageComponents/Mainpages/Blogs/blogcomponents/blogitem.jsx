import { Link } from "react-router-dom"
import dayjs from "dayjs"

export default function BlogItem(props){

 const blogs = props.data.blogs || props.data || []
 

 function formatDate(date){
       const time = dayjs(date).format('MMMM DD, YYYY')


       return time
  }

 return(
    <>
        
         {blogs.map(blog => (
            <section className={props.blogsection}>
                <Link to={`/Blogs/${blog._id}`} className={props.bloglink}>
                 
                <img className={props.blogimage} src={blog.Image}/>
                <div className={props.contentwrapper}>
                  <div className={props.articlewrapper} >
            <strong className={props.blogtitle}>{blog.title}</strong>
              <div className={props.blogdetails}>
              <p className={props.blogarticle} dangerouslySetInnerHTML={{__html:blog.article}}></p>
              </div>
           </div>
             
             <div className={props.datewrapper}>
              <span className={props.date}>{formatDate(blog.created_at)}</span>
              <span></span>
               <p className={props.category}>{blog.category}</p>
               </div>
            
              </div>
        
         </Link>
           </section>
            ))}
    </>
 )
}