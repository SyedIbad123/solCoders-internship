import {
  RootLayout,
  AuthProvider,
  ProtectedRoute,
  UnProtectedRoute,
  LoginPage,
  HomePage,
  SignUpPage,
  AboutPage,
  ProductDetails
} from './index.js'

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import { RecoilRoot } from 'recoil';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>

      <Route element={<UnProtectedRoute/>}>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/productsDetails/:id' element={<ProductDetails/>}/>
      </Route>


    </Route>
  )
)


function App() {
  return (
    <>
    <ToastContainer autoClose={2000} />
    <AuthProvider> 
      <RecoilRoot>
        <RouterProvider router={router}/>
      </RecoilRoot>
    </AuthProvider>
    </>
  );
}

export default App;
