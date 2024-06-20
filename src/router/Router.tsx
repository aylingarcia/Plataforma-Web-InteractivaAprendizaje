import App from "../App"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Game } from "../game/Game";


const Router=() =>{
  const routerForPublic=[
    {
      path:'/',
      element:<App/>
    },
    {
      path:'/game',
      element:<Game/>
    }
  ]
  const router= createBrowserRouter(routerForPublic);
  return <RouterProvider router = {router}/>;
}
export default Router