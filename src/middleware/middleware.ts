import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Middleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  //protected routes for dashboard
  const dashboardRoute = ["/dashboard","/subject"]
  const currentPath = location.pathname;
  useEffect(() => {
    if (dashboardRoute.some((route)=>currentPath.startsWith(route)) && !authToken) {
      navigate("/",{replace:true});
      return;
    }
    if (currentPath === "/" && authToken) {
      navigate("/dashboard",{replace:true});
      return;
    }
  }, [authToken,location,navigate]);
  return children;
}
