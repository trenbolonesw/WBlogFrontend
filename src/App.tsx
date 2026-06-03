import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Layout from './Layout/layout.js'
import LandingPage from './Mainpages/Landing/LandingPage'
import BlogPage from './Mainpages/Blogs/BlogPage'
import AllBlogs from './Mainpages/Blogs/AllBlogs.js'
import SignIn from './Mainpages/AuthPages/Signin.js'
import Login from './Mainpages/AuthPages/Login.jsx'
import { AuthContext } from './Components/shared/context/auth-context.js'
import DashBoard from './Components/AdminComponents/dashboard-components/Dashboard'
import CreateBlog from './Mainpages/AdminPages/createBlog.js'
import EditBlog from './Mainpages/AdminPages/editBlog.js'
import NotFound from './Components/shared/ErrorPages/NotFound.jsx'
import AllPosts from './Mainpages/AdminPages/AllPosts.js'
import './App.css'
import { useAuth } from './Components/shared/hooks/auth-hook.js'
import AdminLayout from './Mainpages/AdminPages/dash-layout.jsx'
import CategoriesList from './Mainpages/Blogs/categories/Catagories-list.js'
import ImageGallary from './Mainpages/Image-Gallary/Gallary.js'
import NewGalary from './Mainpages/AdminPages/NewGallary.js'

function App() {

  const {token,login,logout,userId,
    deleteModal,setDeleteModal,
    createModal,setCreateModal, 
    
  } = useAuth()
 


let routes;

if(token){
 routes = (
  <>
  <Route index element={<LandingPage/>}/>
    <Route path='/Blogs' element={<AllBlogs/>}/>
       <Route path='/signin' element={<SignIn/>}/>
    <Route path='/Blogs/:id' element={<BlogPage/>}/>
    <Route path='/Gallery' element={<ImageGallary/>}/>
    <Route path='/applesg10' element={<Login/>}/>
    <Route path='/Categories/:categoryName' element={<CategoriesList/>}/>
     <Route path='/' element={<AdminLayout/>}>
     <Route path='/g10mtK/:id' element={<DashBoard/>}/>
     <Route path='/AllPosts' element={<AllPosts/>}/>
     <Route path='/newblog' element={<CreateBlog/>}/>
     <Route path='/EditBlog/:id' element={<EditBlog/>}/>
    <Route path='/NewGallery' element={<NewGalary/>}/>
     </Route>
  </>
 )
}else{
  routes= (
    <>
      <Route index element={<LandingPage/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    <Route path='/Blogs' element={<AllBlogs/>}/>
    <Route path='/Categories/:categoryName' element={<CategoriesList/>}/>
    <Route path='/Blogs/:id' element={<BlogPage/>}/>
    <Route path='/applesg10' element={<Login/>}/>
    <Route path='*' element={<NotFound/>}/>
    <Route path='/Gallery' element={<ImageGallary/>}/>
    </>
  )
}


  return (
    <>
    <AuthContext.Provider
    value={
      {
        isLoggedIn:!!token,
        userId:userId,
        token:token,
        logout:logout,
        login:login,
        deleteModal:deleteModal,
        setDeleteModal:setDeleteModal,
        createModal:createModal,
        setCreateModal:setCreateModal,

      }
    }>
   <BrowserRouter>
  
   <Routes>
    <Route path='/' element={<Layout/>}>
    <Route path='*' element={<NotFound/>}/>
    
    {routes}
    </Route>
   </Routes>
   </BrowserRouter>
    </AuthContext.Provider>
    </>
  )
}

export default App
