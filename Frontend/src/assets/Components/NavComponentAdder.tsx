import Apps from "./IndexComponent";
import PageNotFound from "../Helper/PageNotFound";
import FormHandler from "../Helper/Signup";
import LoginHandler from "../Helper/Login";
import Product from "../Helper/Product";
import AddtoCart from "../Helper/AddtoCart";
import Logouts, { LogoutCOmponent } from "../Helper/Logout";
import OrderDetails from "../Helper/OrderDetails";
import HomePage from "../Helper/HomePage";
// import Logout from "../Helper/Logout";

import { Navigate } from "react-router-dom";
import AdminProduct from "../Admin/ProductForm";
import AddCategory from "../Admin/AddCategory";
import AllCategory from "../Admin/AllCategory";
import AllProduct from "../Admin/ProductList";
import AllUser from "../Admin/AllUserData";
import { useContext } from "react";
import UserDetails from "../Authentication";
import AdminTable from "../Admin/AdminTable";
import Account from "../Common/Account";

import AdminOrderList from "../Admin/OrderItemList";
import PaymentSysten from "../Common/PaymentSysten";
import TransactionSuccess, {
  TransactionSuccessByStripe,
} from "../Helper/TransactionSuccess";
import AllPaymentDetails from "../Helper/AllPaymentDetails";
import ReccommendationFeature from "../Helper/ReccommendationFeature";

const RouteHandlers = ({ token, User }) => {
  const role = User && User[0]?.role === "admin";
  console.log("Role" + role);

  return [
    {
      path: "/",
      element: <Apps />,
      children: [
        {
          index: true,
          element: <Navigate to="home" replace={true} />,
        },
        { path: "home", element: <HomePage /> },
        { path: "product", element: <Product /> },
        { path: "product/recommend", element: <Product /> },

        { path: "user/payment/:id", element: <TransactionSuccess /> },
        {
          path: "user/payment/byStripe",
          element: <TransactionSuccessByStripe />,
        },
        { path: "/recommendation", element: <ReccommendationFeature /> },

        { path: "payment/all", element: <AllPaymentDetails /> },

        ...(token
          ? [
              { path: "account", element: <Account /> },
              ...(role
                ? [
                    { path: "admin/addproduct", element: <AdminProduct /> },
                    { path: "admin/addcategory", element: <AddCategory /> },
                    { path: "admin/category", element: <AllCategory /> },
                    { path: "admin/product", element: <AllProduct /> },
                    { path: "admin/user", element: <AllUser /> },
                    { path: "admin/dashboard", element: <AdminTable /> },
                    { path: "admin/orderList", element: <AdminOrderList /> },
                  ]
                : [
                    { path: "cart", element: <AddtoCart /> },
                    { path: "order", element: <OrderDetails /> },
                  ]),
            ]
          : [
              { path: "signup", element: <FormHandler /> },
              { path: "login", element: <LoginHandler /> },
            ]),

        { path: "*", element: <PageNotFound /> },
      ],
    },
  ];
};

export default RouteHandlers;
