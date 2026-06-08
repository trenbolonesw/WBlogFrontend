import {  NavLink } from 'react-router-dom'
import './categories.css'

type CategoryProps = {
    ref?:React.RefObject<null>,
    onClick:()=>void
}

export default function Categories({ref,onClick}:CategoryProps){



    return(
        <>
            <div className='dropdown-list'  ref={ref}>
                <NavLink onClick={onClick} className='c-link' to={`/Categories/Exploration`}>
           <h3 className=''>Exploration </h3>
        </NavLink>
       
              <NavLink onClick={onClick} className='c-link' to={`/Categories/History`}>
                <h3 className=''>History</h3>
                 </NavLink>
                            <NavLink onClick={onClick} className='c-link' to={`/Categories/Photography`}>
                <h3 className=''>Photography</h3>
                </NavLink>
          </div>
        
        </>
    )
}