import LoginPage from "./Pages/Login/Login";
import HomePage from "./Pages/Home/Home";
import AboutPage from "./Pages/About/About";
import SignUpPage from "./Pages/Sign Up/SignUp"
import RootLayout from "./Layout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";

import {AuthProvider} from "./Context/AuthContext";

export {
    RootLayout,
    AuthProvider,
    ProtectedRoute,
    UnProtectedRoute,
    LoginPage,
    SignUpPage,
    HomePage,
    AboutPage
}