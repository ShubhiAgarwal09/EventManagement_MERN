// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={user ? <Component /> : <Navigate to="/login" replace />}
//     />
//   );
// };

// export default PrivateRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

