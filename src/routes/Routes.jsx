import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import DashBoardLayout from "../layout/DashBoardLayout";
import Todo from "./Todo";
import PrivateRoute from "./PrivateRoute";
import AddTask from "./AddTask";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/settings',
            element: <Settings/>,
        },

      ]
     
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashBoardLayout/></PrivateRoute>,
      children:[
        {
          index:true,
          element: <Todo/>
        },
        {
          path:'addTask',
          element: <AddTask/>
        },
      ]
    }
  ]);