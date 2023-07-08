import React, { useContext } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router";
import { AuthContext } from "../../context";
import Loader from "./loader/Loader";

const AppRouter = () => {
  const {isAuth, islLoading} = useContext(AuthContext);

  if(islLoading){
    return <Loader/>
  }
 
  return(
    isAuth
    ?
    <Routes>
      {privateRoutes.map(route =>
        <Route
          path={route.path}
          element={route.element}
          exact={route.exact}
          key={route.path}
        />
      )}

      <Route   path="*" element={ <Navigate replace to="/post"/>}></Route>
    </Routes>
    :
    <Routes>
      {publicRoutes.map(route =>
        <Route
          path={route.path}
          element={route.element}
          exact={route.exact}
          key={route.path}
        />
      )}

      <Route   path="*" element={ <Navigate replace to="/login"/>}></Route>
    </Routes>
  )
}

export default AppRouter;