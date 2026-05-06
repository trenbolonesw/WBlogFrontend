import { useContext,useState,useEffect } from 'react'
import './modal.css'
import { AuthContext } from '../../context/auth-context'

export default function CreatedModal(){

 const auth = useContext(AuthContext)

   const [visible, setVisible] = useState(false);
   const [animatingOut, setAnimatingOut] = useState(false);


    useEffect(() => {
      if(auth.createModal){
       setVisible(true)
       setAnimatingOut(false)


       
      const hideTimeout = setTimeout(() => {
        setAnimatingOut(true);
        // Wait for the slide-out animation before hiding the modal
        setTimeout(() => {
          setVisible(false);
          auth.setCreateModal(false);
        }, 500); // Duration of slide-out
      }, 3000);

      return () => clearTimeout(hideTimeout);
      }
    },[auth.createModal,auth])

      if (!visible) return null;

    return(
        <>
        {auth.createModal && <div  className={`toast-modal ${animatingOut ? "slide-out" : "slide-in"}`}>
        <h3>Blog Created 👍 </h3>
       </div> }
        </>
    )
}