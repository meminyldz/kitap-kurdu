import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  //login değilse
  if (!user) {
    return <Navigate to="/login" />;
  }

  //role yetkisi yoksa
  if(!user.role){
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;