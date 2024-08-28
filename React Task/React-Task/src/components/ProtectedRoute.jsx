import { useContext } from 'react';
import { Authorizer } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
    const {login} = useContext(Authorizer);

    if (!login) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
