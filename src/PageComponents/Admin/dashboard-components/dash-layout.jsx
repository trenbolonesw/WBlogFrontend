
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import './auth-header.css'
export default function AdminLayout(){
    return(
        <div className="auth-header">
         <DashHeader/>
        <Outlet/>
        
        </div>
    )
}