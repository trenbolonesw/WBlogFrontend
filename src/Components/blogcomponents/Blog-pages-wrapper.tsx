//a component for gallary,all blogs and categories
import React, { ReactNode } from 'react'
import styles from './blogwrapper.module.css'

interface PageProps extends React.PropsWithChildren {
    title:string;
    children:ReactNode| ReactNode[]
}

export default function BlogWrapper({children,title}:PageProps){

    return(
        <>
        <div className={styles.propPage}>
            <div className={styles.headerWrapper}>
                <h1>{title}</h1>
                
                </div>
         {children}
        </div>
        </>
    )

}