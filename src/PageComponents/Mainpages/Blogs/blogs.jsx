

import './blogs.css'

import DeletedModal from '../../modals/DeletedModal'
import CreatedModal from '../../modals/CreatedModal'
import LoadingModal from '../../modals/LoadingModal'
import BlogItem from './blogcomponents/blogitem'

export default function Blogs({data,loading}){

   
    


      return(
         <>
        
       <div className='blogs-flex'>
         {loading && <LoadingModal/>}
          {!loading && data?.length > 0 &&<BlogItem 
          contentwrapper='content-wrapper'
          datewrapper='date-wrapper'
           data={data}
           articlewrapper="article-wrapper"
           blogtitle="Blog-title" 
           blogsection="item-section"
           bloglink='read-more'
           blogimage="blogs-image"
           blogarticle="blogs-article"
           blogdetails="blogs-details"
           date="blogs-date"
           category='blogs-category'
           /> }
         {!loading && data?.blogs?.length === 0 && (
            <p className='no-blogs'>no blogs found</p>
         )}
            <DeletedModal/>
            <CreatedModal/>
         </div>
        </>
      )
}

 