

import './blogs.css'

import DeletedModal from '../../Components/modals/DeletedModal'
import CreatedModal from '../../Components/modals/CreatedModal'
import LoadingModal from '../../Components/modals/LoadingModal'
import BlogItem from '../../Components/blogcomponents/blogitem'
import { Blog } from '../../Types/Blog-Data-types'
import MiniBlogCard from './miniblogcard'
interface BlogItemsProps{
 blogs:Blog[],
 loading:boolean,
 
}


export default function Blogs({blogs,loading}:BlogItemsProps){

   
    


      return(
         <>
        
       <div className='blogs-flex'>
         {loading && <LoadingModal/>}
          {!loading && blogs?.length > 0 &&
          <MiniBlogCard
           Blogs={blogs}
           /> }
         {!loading && blogs?.length === 0 &&  <h3 className='no-blogs'>no blogs found</h3>}
   
            <DeletedModal/>
            <CreatedModal/>
         </div>
        </>
      )
}

 