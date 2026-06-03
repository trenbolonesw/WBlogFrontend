import CrudLoader from "../PageComponents/modals/crud-loader"

export default function LoadingDiv({loading,children}){
    return(
        <>
      {loading ?<CrudLoader/>:  <button type='submit' className='post'>Post</button>}
        </>
    )
}