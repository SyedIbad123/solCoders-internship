import { useContext } from 'react';
import { Authorizer } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const UnProtectedRoute = () => {
    const {login} = useContext(Authorizer);
    if (login) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
}

export default UnProtectedRoute;
