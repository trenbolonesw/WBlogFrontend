import { NavLink } from "react-router-dom"
import styles from './newestwrapper.module.css'

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
    <div className={styles.newestWrapper}>
   
    <div className={styles.topHeading}>
      <h3 className={styles.newestH3}>{title}</h3>
      <NavLink className={styles.viewAll} to={url}>View All</NavLink>
    </div>
    <div className={styles.contentSection}>
       {renderLeft(firstItem,0)}
       <div className={styles.borderLine}></div>
       <div className={styles.contentSquare}>{children(secondaryItems)}</div>
       </div>
    </div>
    </>
    )
}