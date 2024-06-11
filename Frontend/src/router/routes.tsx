import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ManufacturerPage from "../pages/ManufacturerPage/ManufacturerPage";
import { Random } from "../components/Sidebar/Sidebar";
import Merchandise from "../components/Merchandise/Merchandise";
import ManufacturerProduct from "../components/ManufacturerProduct/ManufacturerProduct";
import Distributor from "../components/Distributor/Distributor";


const routes = [
    {
        path: '/',
        element: <LoginPage/>
    },
    {
        path:'/manufacturer',
        element:<ManufacturerPage/>,
        children:[
            {
                path:"products",
                element: <ManufacturerProduct/>
            },
            {
                path:"orders",
                element: <Random/>
            },
            {
                path:"reports",
                element: <Random/>
            },
            {
                path:"merchandise",
                element: <Merchandise/>
            },
            {
                path:"customers",
                element: <Random/>
            },
            {
                path:"distributors",
                element: <Distributor/>
            },
            {
                path:"profile",
                element: <Random/>
            }
        ]
    }
    // ,{
    //     path:"/manufacturer/products",
    //     element:<Random/>
    // }
]


export const router = createBrowserRouter(routes)