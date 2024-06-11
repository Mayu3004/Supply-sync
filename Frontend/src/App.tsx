
import { RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ManufacturerPage from "./pages/ManufacturerPage/ManufacturerPage";
import { router } from "./router/routes";


const App = () =>{
  return(
    <div>
      {/* <LoginPage/>       */}
      {/* <ManufacturerPage/> */}
      <RouterProvider router = {router}>

    </RouterProvider>
    </div>
  )
}
export default App;