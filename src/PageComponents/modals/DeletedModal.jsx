import { useContext, useEffect,useState } from "react"
import { AuthContext } from "../../context/auth-context"
import './modal.css'
export default function DeletedModal(){

  const auth = useContext(AuthContext)
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
    useEffect(() => {
      if(auth.deleteModal){
       setVisible(true)
       setAnimatingOut(false)


       
      const hideTimeout = setTimeout(() => {
        setAnimatingOut(true);
        // Wait for the slide-out animation before hiding the modal
        setTimeout(() => {
          setVisible(false);
          auth.setDeleteModal(false);
        }, 500); // Duration of slide-out
      }, 3000);

      return () => clearTimeout(hideTimeout);
      }
    },[auth.deleteModal,auth])

      if (!visible) return null;



    return(
        <>
        {auth.deleteModal && (
             <div  className={`toast-modal ${animatingOut ? "slide-out" : "slide-in"}`}>
        <h3>Blog Deleted 👍 </h3>
       </div> 

        )}
        </>
    )
}