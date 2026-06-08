import { pageProps } from "../../../../Types/shared-types"
import LoadingModal from "../../../modals/LoadingModal";
import Button from "../FormElements/Button";
import './authwrapper.css'

interface Authprops extends pageProps{
  // add props for switch user later
  onSubmit:React.FormEventHandler<HTMLFormElement>,
  error:string|null,
  loading:boolean,
  title:string
}

export default function AuthWrapper({title,loading,error,children,onSubmit}:Authprops){





    return(
        <>
        <div className="Auth-wrapper">
            <h3 className="auth-state">{title}</h3>
        <form onSubmit={onSubmit} className="credentials">
            {children}
          {loading ? <LoadingModal/> :  <Button type="submit" cssClass="auth-button">Login</Button>}
        </form>
        {error && <p className="error">{error}</p>}
        </div>
        </>
    )
}