import { useState,useCallback,useEffect } from "react"

export const useAuth = () => {


  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
const [deleteModal,setDeleteModal] = useState(false)
const [createModal,setCreateModal] = useState(false)
const [tokenExpire,setTokenExpire] = useState();
 const [adminInfo, setAdminInfo] = useState(null);
 const [backdrop,setBackdrop] = useState(false)
let logoutTimer;


  const login = useCallback((uid, token,expirationDate) => {
    setToken(token);
    setTokenExpire(null)
    setUserId(uid)
    const tokenExpirationDate = expirationDate ||
    new Date( new Date().getTime() + 1000 * 60 * 60 * 60)
    setTokenExpire(tokenExpirationDate)

localStorage.setItem('userData',
  JSON.stringify({userId:uid,token:token,
  expiration:tokenExpirationDate.toISOString()}))
   
 
   
    
  }, []);

  const logout = useCallback(() => {
     console.log("Logout triggered");
    setToken(null);
    setUserId(null);
    setTokenExpire(null)
    localStorage.removeItem('userData')
  }, []);


useEffect(() => {

if(token && tokenExpire){
  const remainingTime = tokenExpire.getTime() - new Date().getTime();
  logoutTimer = setTimeout(logout,remainingTime)
}else{
  clearTimeout(logoutTimer)
}
},[token,logout,tokenExpire])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
   
   if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
    console.log("Auto-login with stored token");
    login(storedData.userId,storedData.token,new Date(storedData.expiration))
   }
  },[login])

  return {userId,token,
    login,logout,deleteModal,
    setDeleteModal,createModal,
    setCreateModal,
  adminInfo, setAdminInfo, }
}

