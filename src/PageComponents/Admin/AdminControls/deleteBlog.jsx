import { useContext, useState } from "react"
import { AuthContext } from "../../../context/auth-context"
import { useNavigate } from "react-router-dom"
import CrudLoader from "../../modals/crud-loader"
export default function DeleteBlog(props){
 const nav = useNavigate()
 const [modal,setModal] = useState(false)
  const [loading,setLoading] = useState(false)
const auth = useContext(AuthContext)
const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL
  async function deleteBlog(){
    setLoading(true)
     const response = await fetch(`${API_URL_BLOGS}${props.id}`
      ,{method:'DELETE',
        headers:{
          Authorization:'Bearer '+ auth.token}
      })

      if(!response.ok){
        throw new Error('deletion failed!')
      }else{
        auth.setDeleteModal(true)
        setLoading(false)
                nav('/Blogs')
               
                
      }
  }

    function showModal(){
      setModal(prev => ! prev)
     
    }
   

    return(
        <>
         <button onClick={showModal} className={props.mainDelete} >Delete blog</button>
          <div className={`${props.class} ${modal ? props.showDelete : props.hideDelete}`}>
         <h4>Are you sure you want to delete this blog?</h4>
         {loading ? <CrudLoader/> :  <button onClick={deleteBlog} className={props.delete}>yes</button>}
         <button className={props.cancelDelete} onClick={showModal}>Cancel</button>
         </div>
        
        </>
    )
}