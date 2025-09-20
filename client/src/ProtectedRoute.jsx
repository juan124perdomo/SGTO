import React from 'react'
import { useAuth } from './context/useAuth'
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
const   { isAutenticated, loading}= useAuth();
  console.log(loading, isAutenticated);

if(loading) return <h1>Loading...</h1>;
if(!loading &&!isAutenticated) return <Navigate to="/login" replace/>

  return (
    <Outlet/>
  )
}

export default ProtectedRoute
