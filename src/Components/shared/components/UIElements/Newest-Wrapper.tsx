import { NavLink } from "react-router-dom"
import './newestwrapper.css'

type NewestGallaryProps<T> = {
 items:T[];
  url:string;
  title:string;
  renderLeft:(item:T,index:number) => React.ReactNode;
  children:(items:T[]) => React.ReactNode;

}

export default function NewestWrapper<T>({items,title,url,renderLeft,children}:NewestGallaryProps<T>){

    if(items.length === 0){
      return null
    }

   const firstItem = items?.[0];
const secondaryItems = items?.slice(1) ?? [];


    return(
         <>
    <div className="newest-wrapper">
   
    <div className="top-heading">
      <h3 className="newest-h3">{title}</h3>
      <NavLink className="view-all" to={url}>View All</NavLink>
    </div>
    <div className="content-section">
       {renderLeft(firstItem,0)}
       <div className="content-square">{children(secondaryItems)}</div>
       </div>
    </div>
    </>
    )
}