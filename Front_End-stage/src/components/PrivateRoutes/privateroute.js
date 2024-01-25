import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const [userinfos, setuserinfos] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  setuserinfos(userinfos);
  return userinfos ? <Outlet /> : <Navigate to="/signin" />;
};
export default PrivateRoute;
