import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard";
import Login from "../pages/login/login";
import Register from "../pages/register/register";



const routes = createBrowserRouter([
    {
        id: "home",
        path: "/",
        Component: Dashboard,
        index: true
    },
    {
        path: '/dashboard',
        id: 'dashboard',
        Component: Dashboard,
    },
    {
        path: '/login',
        id: 'login',
        Component: Login,        
    },
    {
        path: '/register',
        id: 'register',
        Component: Register
    }
])

export { routes, RouterProvider }