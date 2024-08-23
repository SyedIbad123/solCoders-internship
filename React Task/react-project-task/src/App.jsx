import {
  RootLayout,
  AuthProvider,
  LoginPage,
  HomePage
} from './index.js'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Route>
  )
)


function App() {
  return (
    <>
    <ToastContainer autoClose={2000} />
    <AuthProvider> 
      <RouterProvider router={router}/>
    </AuthProvider>
    </>
  );
}

export default App
