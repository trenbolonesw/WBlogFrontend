import { Link } from 'react-router-dom'
import './Categories.css'
import './list.css'
import { useNavigate } from 'react-router-dom'
import image from '../../../../assets/images/Return.svg'
export default function Categories(){

 const Nav = useNavigate()



function PrevPage(){
    Nav(-1)
}

    return(
        <>
        <div className='page'>
            <div className='header-wrapper'>
             <button className='back-button' onClick={PrevPage}> <img src={image} className='back-button'/></button>
             <h1 className='categories-h1'>Categories</h1>
             </div>
        
        <section className='categories'>
            <div className='c-container flex'>
                <Link className='c-Link' to={`/Categories/Exploration`}>
           <h1 className='c-h1'>Exploration
            
        </h1>
        </Link>
            </div>
            <div className='c-container1 flex'>
                 <Link className='c-Link' to={`/Categories/History`}>
                <h1 className='c-h1'>History</h1>
                 </Link>
            </div>
            <div className='c-container2 flex'>
                 <Link className='c-Link' to={`/Categories/Photography`}>
                <h1 className='c-h1'>Photography</h1>
                </Link>
            </div>
            </section>
        </div>
       
        </>
    )
}