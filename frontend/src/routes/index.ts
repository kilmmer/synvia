import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";


const routes = createBrowserRouter([
    {
        id: "home",
        path: "/",
        Component: Dashboard
    },
    {
        path: '/dashboard',
        id: 'dashboard',
        Component: Dashboard,
    },
    {
        path: '/login',
        id: 'login',
        Component: Login
    },
    {
        path: '/signup',
        id: 'signup',
        Component: Signup
    }
])

export { routes, RouterProvider }