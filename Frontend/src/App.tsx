
import { RouterProvider } from "react-router-dom";

import { router } from "./router/routes";
import { ToastContainer } from "react-toastify";



const App = () => {
  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
      <ToastContainer />
    </div>
  )
}
export default App;