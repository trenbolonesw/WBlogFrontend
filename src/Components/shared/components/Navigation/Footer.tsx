import './footer.css'
import image from '../../../../assets/images/WBlog.svg'
import { Link } from 'react-router-dom'
import { pageProps } from '../../../../Types/shared-types'

interface footerprops extends pageProps {
    insta:string,
    yt:string
}

export default function Footer({insta,yt}:footerprops){
    return(
        <>
                    <div className='links-wrapper'>
                        <div className='footer-logo-wrapper'>
                        <Link className='footer-link' to="/"><img src={image} className='footer-logo'/><p className='footer-title'>WBlog</p></Link>
                        </div>
                            <h3 className='footerh1'>Follow me on:</h3>
                            
                        <a className='a-links' href='https://www.instagram.com/riley_waldner_photography?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
                        <img src={insta} className='footer-imageinsta'/>
                      
                        <p className='footer-p'>Instagram</p>
                        </a>
                       <a className='a-links' href=''><img src={yt} className='footer-imageyt'/> 
                        <p className='footer-p'>Youtube</p>
                        </a>
                        
                        </div>
                      
        </>
    )
}