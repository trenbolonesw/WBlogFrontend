import { Link } from "react-router-dom"
import dayjs from "dayjs"
import React from 'react'
import { Blog } from "../../Types/Blog-Data-types"
import './blogitem.css'

interface BlogItem{
Blogs:Blog[]
}


export default function BlogItem({Blogs}:BlogItem){



 

 function formatDate(date:Date){
       const time = dayjs(date).format('MMMM DD, YYYY')


       return time
  }

  
 

 return(
    <>
        
         {Blogs.map((blog:Blog) => (
            <section className="item-section" key={blog._id}>
             
                <Link to={`/Blogs/${blog._id}`} className="read-more">
                 
                <img className="blogs-image" src={blog.Image}/>
                <div className="content-wrapper">
                  <div className="article-wrapper" >
            <strong className="blog-title">{blog.title}</strong>
              <div className="blog-details">
              <p className="blogs-article" dangerouslySetInnerHTML={{__html:blog.article}}></p>
              </div>
           </div>
             
             <div className="date-wrapper">
              <span className="blogs-date">{formatDate(blog.created_at)}</span>
              <span></span>
               <p className="blogs-category">{blog.category}</p>
               </div>
            
              </div>
        
         </Link>
           </section>
            ))}
    </>
 )
}