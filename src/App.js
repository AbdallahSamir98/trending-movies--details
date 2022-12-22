import React, { useEffect, useState } from "react";
import {  createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Main from "./Components/Main/Main.jsx";
import People from "./Components/People/People.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Tv from "./Components/Tv/Tv.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/Notfount/NotFound.jsx";
import Login from "./Components/Login/Login.jsx";
import Moviesdetails from "./Components/MoviesDetails/Moviesdetails.jsx";
import jwtDecode from "jwt-decode";
import { Offline} from "react-detect-offline";
import { ApiContextFunction } from "./Context/Context.js";

export default function App() {
  const [loginData, setLoginData] = useState(null);

  function getLoggedInUserData() {
    //for get Logged In User Data

    if (localStorage.getItem("tkn") != null) {
      let tkn = localStorage.getItem("tkn");
      let userData = jwtDecode(tkn);
      setLoginData(userData);
      console.log(userData);
    }
  }

  function removeUserData() {
    //for remove data when logout
    //remove data from local storge
    localStorage.removeItem("tkn");

    //remove data from login object
    setLoginData(null);
  }

  function checkReload() {
    //check if user click reload page

    if (localStorage.getItem("tkn") != null) {
      getLoggedInUserData();
    }
  }
  useEffect(() => checkReload(), []); //to call check reload function


  function ProtectedRoute(props){ //to make protect route on all component (send all component by props)

      if (localStorage.getItem('tkn') == null ){ //kda l user m3blsh login
          
        return  <Navigate to='/login' /> // navigate el user y3ml login

      }else{
            //kda el user 3mal login awdeha 3la l comopnent 
        return <>

            {props.children} 
        </>
      }


  }

  const routers = createHashRouter([
    {
      path: "",
      element: <Main crrUser={loginData} removeData={removeUserData} />,
      children: [
        { path: "", element:<ApiContextFunction><ProtectedRoute><Home /></ProtectedRoute></ApiContextFunction>  },
        { path: "home", element:<ApiContextFunction><ProtectedRoute><Home /></ProtectedRoute></ApiContextFunction> },
        { path: "people", element: <ApiContextFunction><ProtectedRoute><People /></ProtectedRoute></ApiContextFunction> },
        { path: "movies", element: <ApiContextFunction><ProtectedRoute><Movies /></ProtectedRoute></ApiContextFunction>},
        {
          path: "moviesdetails",
          element: <ProtectedRoute> <Moviesdetails /> </ProtectedRoute>,
          children: [
            { path: ":media", children: [{ path: ":id" }] }, // 3lshan ab3t parameter fe l url
          ],
        },
        { path: "tv", element: <ApiContextFunction><ProtectedRoute> <Tv />   </ProtectedRoute></ApiContextFunction> },
        { path: "register", element: <Register /> },
        {
          path: "login",
          element: <Login loginUserData={getLoggedInUserData} />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <>
      <Offline> <div className="offline bg-danger">You're offline , check your internet connection </div> </Offline>
      <RouterProvider router={routers} />

  </>}
