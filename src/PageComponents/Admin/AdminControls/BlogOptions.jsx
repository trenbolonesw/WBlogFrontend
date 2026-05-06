import DeleteBlog from '../AdminControls/deleteBlog'
import { useState } from "react"
import { Link } from "react-router-dom"
import './blogoptions.css'
export default function BlogOptions(props){
    const [displayOptions,setDisplayOptions] = useState(false)
    
function showOptions(){
   setDisplayOptions(prev => !prev)
  }

  return(
    <>
    <div>
        

           <div className={`options-tab ${displayOptions ? 'show':'hide'}`}>
            <h4>Actions</h4>

              <Link className='options edit-link' to={`/EditBlog/${props.id}`}>edit</Link>
                <DeleteBlog 
              class='delete-modal'
              cancelDelete="cancel-delete"
              mainDelete='main-delete'
              delete="delete" 
              showDelete='show'
              hideDelete='hide'
              id={props.id}/>
             <button onClick={showOptions} className='options small'>close</button>
            </div>
        <div onClick={showOptions} className='options-Button'>...</div>
    </div>
    </>
  )
}