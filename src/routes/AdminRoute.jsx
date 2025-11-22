import React from 'react'
import useAuth from '../hooks/useAuth'
import useUserRole from '../hooks/useUserRole';
import Loading from '../Pages/Shared/Loading';
import { Navigate } from 'react-router';


export default function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    const { role } = useUserRole();
    if (loading) {
        return <Loading></Loading>
    }

    if (!user || role !== "admin") {
        return <Navigate to="/forbidden"></Navigate>
    }

    return <div>{children}</div>

}
