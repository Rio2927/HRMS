// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user } = useAuth();

//   // If user not logged in, redirect to login page
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Else allow access
//   return children;
// }

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
