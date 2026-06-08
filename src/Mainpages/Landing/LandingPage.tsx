import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import image from '../../assets/images/HeroImage.webp'
import NewestBlogs from '../../Components/blogcomponents/NewestBlogs'
import NewestGallary from '../../Components/gallary-components/NewestGallary'
export default function LandingPage(){
    return(
        <div className={styles.Landing}>
            <section className={styles.Hero}>
                 <div className={styles.heroFlex}>
                    <div className={styles.left}>
                     <div className={styles.topFlags}>
                      <div className={styles.leftFlag}>Photography</div>
                        <div className={styles.rightFlag}>Exploring</div>
                     </div>
                     <h1 className={styles.h1}>blog name</h1>
                     <h3 className={styles.h3}>My personal Photography and Blogs for all to see</h3>
                     <Link to={'/Gallery'} className={styles.workFlag}>See my work</Link>
                    </div>
                     <div className={styles.right}>
                      <img src={image} className={styles.heroImage}/>
                    </div>
                 </div>  
            </section>
            <section className={styles.newBlogs}>
         <NewestBlogs/>
            </section>
            <section className={styles.newGallary}>
          <NewestGallary/>
            </section>
        </div>
    )
}