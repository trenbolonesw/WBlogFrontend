
import React, { ReactNode } from 'react'
import styles from './itemwrapper.module.css'

interface PageProps extends React.PropsWithChildren {
    title:string;
    children:ReactNode| ReactNode[],
    description?:string
}

export default function ItemWrapper({children,title,description}:PageProps){

    return(
        <>
        <div className={styles.propPage}>
            <div className={styles.headerWrapper}>
                <h1 className={styles.h3Title}>{title}</h1>
                <h3 className={styles.h3Gallary}>{description}</h3>
                </div>
         {children}
        </div>
        </>
    )

}