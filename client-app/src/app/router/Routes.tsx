import { RouteObject, createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import HomePage from "../layout/home/HomePage"
import ActivityForm from "../../features/activities/form/ActivityForm"
import ActivityDetails from "../../features/activities/details/ActivityDetails"

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [            
            {path:"activities",element:<ActivityDashboard/>},
            {path:"createActivity",element:<ActivityForm  key={'create'}/> },
            {path:"createActivity/:id",element:<ActivityForm key={'edit'} />},
            {path:"activities/:id",element:<ActivityDetails/>},]
    }
]
export const router = createBrowserRouter(routes)