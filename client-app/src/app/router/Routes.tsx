import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import ActivityForm from "../../features/activities/form/ActivityForm"
import ActivityDetails from "../../features/activities/details/ActivityDetails"
import TestErrors from "../../features/activities/error/TestError"
import NotFound from "../../features/activities/error/NotFound"
import ServerError from "../../features/activities/error/ServerError"
import LoginForm from "../../features/activities/user/LoginForm"

//Source: https://reactrouter.com/en/main/route/route
export const routes: RouteObject[] = [
    {  
        path: "/",
        element: <App />,
        children: [  
            // when the URL matches this segment          
            {path:"activities",
            // it renders this element
            element:<ActivityDashboard/>},
            {path:"createActivity",element:<ActivityForm  key={'create'}/> },
            {path:"createActivity/:id",element:<ActivityForm key={'edit'} />},
            {path:"login",element:<LoginForm />},
            {path:"activities/:id",element:<ActivityDetails/>},
            {path:"server-error/",element:<ServerError/>},
            {path:"testError/",element:<TestErrors/>},
            {path:"not-found/",element:<NotFound/>},
            {path:"*",element:<Navigate replace to={'/not-found'} />},
        ]
    }
]
export const router = createBrowserRouter(routes)