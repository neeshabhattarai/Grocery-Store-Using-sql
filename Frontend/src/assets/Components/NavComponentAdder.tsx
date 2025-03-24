import{createBrowserRouter} from "react-router-dom";
import Apps from "./IndexComponent";
import PageNotFound from "../Helper/PageNotFound";

const Home=()=>{
    return(<h2>Hello</h2>)
}

const Routing=createBrowserRouter([
    {path:'/', element:<Apps/>,children:[
    {path:'/home',element:<Home/>},
    ],
    errorElement:<PageNotFound/>
}
])
export default Routing;
