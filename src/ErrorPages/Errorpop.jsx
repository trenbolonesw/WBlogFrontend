import retry from '../assets/images/retry.svg'
import CrudLoader from '../PageComponents/modals/crud-loader'
export default function ErrorPop({error,loading}){
    return(
        <>
      {
        error  &&
         (
         <>
         <p>failed to post, please try again</p>
          {loading ? <button type='submit' className='retry'><img src={retry}/></button> : <CrudLoader/>}
          </>
         )
         }
         </>
    )
}