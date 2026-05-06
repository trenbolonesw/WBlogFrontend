import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Layout from './PageComponents/Layout/layout'
import LandingPage from './PageComponents/Mainpages/Landing/Landing'
import BlogPage from './PageComponents/Mainpages/Blogs/BlogPage'
import AllBlogs from './PageComponents/Mainpages/Blogs/AllBlogs'
import SignIn from './PageComponents/Admin/Signin'
import Login from './PageComponents/Admin/Login'
import { AuthContext } from './context/auth-context'
import DashBoard from './PageComponents/Admin/Dashboard'
import CreateBlog from './PageComponents/Admin/AdminControls/createBlog'
import EditBlog from './PageComponents/Admin/AdminControls/editBlog'
import NotFound from './ErrorPages/NotFound'
import AllPosts from './PageComponents/Admin/dashboard-components/AllPosts'
import './App.css'
import { useAuth } from './hooks/auth-hook'
import AdminLayout from './PageComponents/Admin/dashboard-components/dash-layout'
import Categories from './PageComponents/Mainpages/Blogs/categories/Categories'
import CategoriesList from './PageComponents/Mainpages/Blogs/categories/Catagories-list'
import ImageGallary from './PageComponents/Mainpages/Image-Gallary/Gallary'
import NewGalary from './PageComponents/Admin/AdminControls/NewGallary'

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
        <Route path='/Categories' element={<Categories/>}/>
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
    <Route path='/Categories' element={<Categories/>}/>
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
