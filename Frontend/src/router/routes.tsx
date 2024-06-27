import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ManufacturerPage from "../pages/ManufacturerPage/ManufacturerPage";
import { Random } from "../components/Sidebar/Sidebar";
import Merchandise from "../components/Merchandise/Merchandise";
import ManufacturerProduct from "../components/ManufacturerProduct/ManufacturerProduct";
import Distributor from "../components/Distributor/Distributor";
import { GUARDS } from "./guards";
import { Navigate } from "react-router-dom";
import ManufacturerInventory from "../components/ManufacturerInventory/ManufacturerInventory";
import DistributorPage from "../pages/DistributorPage/DistributorPage";
import DistributorProduct from "../components/DistributorProduct/DistributorProduct";
// import RequestMerchandise from "../components/RequestMerchandise/RequestMerchandise";
import ProductOrders from "../components/ProductOrders/ProductOrders";
import ParentMerchandise from "../components/ParentMerchandise/ParentMerchandise";
import Customer from "../components/Customer/Customer";
import ParentRequests from "../components/ParentRequests/ParentRequests";
import CustomerMerchandise from "../components/CustomerMerchandise/CustomerMerchandise";
import DistributorSales from "../components/DistributorSales/DistributorSales";
import ParentManufacturerRequests from "../components/ParentManufacturerRequests/ParentManufacturerRequests";
import TopPerformers from "../components/TopPerformers/TopPerformers";
import TopProductSales from "../components/TopProductSales/TopProductSales";
import RequestedMerchandise from "../components/RequestedMerchandise/RequestedMerchandise";
import Profile from "../components/Profile/Profile";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ManufacturerProductWrapper from "../components/ManufacturerProduct/ManufacturerProduct";

type predicate = () => boolean;

const canActivate = (
    Component: React.ComponentType<any>,
    guards: predicate[],
    to: string = "/"
) => {
   
    return () => {
       
        if (!guards.every((guard) => guard())) return <Navigate to={to} />;

        return <Component />;
    };
};

const routes = [
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/manufacturer',
        Component: canActivate(ManufacturerPage, [GUARDS.isLoggedIn, GUARDS.grantAccessTo(["Manufacturer"])]),
        // element:<ManufacturerPage/>,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "",
                element: <ManufacturerProductWrapper />
            },
            {
                path: "products",
                element: <ManufacturerProduct />
            },
            {
                path: "inventory",
                element: <ManufacturerInventory />
            },
            {
                path: "orders",
                element: <ProductOrders />
            },
            {
                path: "reports",
                element: <ParentManufacturerRequests />,
                children: [
                    {
                        path: "",
                        element: <Random />
                    },
                    {
                        path:"top-moving-products",
                        element:<TopProductSales/>
                    },
                    {
                        path:"top-distributors",
                        element:<TopPerformers/>
                    },
                    {
                        path:"sales-chart",
                        element:<Random/>
                    }
                ]
            },
            {
                path: "merchandise",
                element: <ParentMerchandise />,
                children: [
                    {
                        path:'',
                        element:<Merchandise/>
                    },
                    {
                        path:'allmerchandise',
                        element:<Merchandise/>
                    },
                    {
                        path: 'requestedmerchandise',
                        element:<RequestedMerchandise/>
                    }
                ]
            },
            {
                path: "customers",
                element: <Customer />
            },
            {
                path: "distributors",
                element: <Distributor />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    },
    {
        path: '/distributor',
        Component: canActivate(DistributorPage, [GUARDS.isLoggedIn, GUARDS.grantAccessTo(["Distributor"])]),
        // element:<ManufacturerPage/>,
        errorElement:<ErrorPage />,
        children: [
            {
                path: "",
                element: <DistributorProduct/>
            },
            {
                path: "inventory",
                element: <DistributorProduct />,
            },
            {
                path: "reports",
                element: <ManufacturerInventory />
            },
            {
                path: "requests",
                element: <ParentRequests />,
                children: [
                    {
                        path:'',
                        element:<ProductOrders/>
                    },
                    {
                        path:'orders',
                        element:<ProductOrders/>
                    },
                    {
                        path:'merchandise',
                        element:<CustomerMerchandise/>
                    }
                ]
            },
            {
                path: "sales",
                element: <DistributorSales />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage /> 
    }

    // ,{
    //     path:"/manufacturer/products",
    //     element:<Random/>
    // }
]


export const router = createBrowserRouter(routes)