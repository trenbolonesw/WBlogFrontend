import { NavLink } from "react-router-dom"
import { pageProps } from "../../../../Types/shared-types"
import './newestwrapper.css'
import { Blog } from "../../../../Types/Blog-Data-types"
import XLBlogCard from "../../../blogcomponents/XlBlogCard"

interface Newest extends pageProps{
  url:string,
  leftCard:Blog[]
}

export default function NewestWrapper({children,title,url,leftCard}:Newest){
    return(
         <>
    <div className="newest-wrapper">
   
    <div className="top-heading">
      <h3 className="newest-h3">{title}</h3>
      <NavLink className="view-all" to={url}>View All</NavLink>
    </div>
    <div className="content-section">
       <XLBlogCard Blogs={leftCard}/>
       <div className="content-square">{children}</div>
       </div>
    </div>
    </>
    )
}