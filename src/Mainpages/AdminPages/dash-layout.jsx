
import { Outlet } from 'react-router-dom'
import DashHeader from '../../Components/AdminComponents/dashboard-components/DashHeader'
import './auth-header.css'
export default function AdminLayout(){
    return(
        <div className="auth-header">
         <DashHeader/>
        <Outlet/>
        
        </div>
    )
}