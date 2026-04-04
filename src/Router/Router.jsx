import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Root from "../Component/Root";
import Error from "../Component/Error";
import DashboardLayout from "../AuthLayout/DashboardLayout";
import Admin from "../Pages/Dashboard/Admin";
// import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Component/MyProfile";
import EditProfile from "../Component/EditProfile";
// import MyApplication from "../Pages/Dashboard/MyApplication";
import TermService from "../Component/TermService";
import Privacy from "../Component/Privacy";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import CustomerOrder from "../Pages/Dashboard/CustomerOrder";
import CustomerContact from "../Pages/Dashboard/CustomerContact";
import ProductDetails from "../Component/ProductDetails";
import AddProducts from "../Component/AddProducts";
import EditProduct from "../Component/EditProduct";
import AllProducts from "../Pages/AllProducts";
import AddProductsList from "../Pages/Dashboard/AddProductsList";
import MyOrders from "../Pages/Dashboard/MyOrders";
import FormalShirt from "../Pages/FormalShirt";
import CasualShirt from "../Pages/CasualShirt";
import Pant from "../Pages/Pant";
import Panjabi from "../Pages/Panjabi";
import BlogPage from "../Component/BlogPage";
import AddHeroPhoto from "../Pages/Dashboard/AddHeroPhoto";
import TShirt from "../Pages/TShirt";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/products-details/:id",
        Component: ProductDetails,
      },

      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
      {
        path: "/formal-shirt",
        Component: FormalShirt,
      },
      {
        path: "/casual-shirt",
        Component: CasualShirt,
      },
      {
        path: "/pant",
        Component: Pant,
      },
      {
        path: "/panjabi",
        Component: Panjabi,
      },
      {
        path: "/t-shirt",
        Component: TShirt,
      },
      {
        path: "/terms-service",
        Component: TermService,
      },
      {
        path: "/privacy-policy",
        Component: Privacy,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/student",
        element: (
          <PrivateRoute>
            <AddProductsList></AddProductsList>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/tuition/:id/edit",
        Component: EditProduct,
      },

      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <Admin></Admin>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "/dashboard/payment",
      //   Component: PaymentHistory,
      // },
      {
        path: "/dashboard/my-orders",
        Component: MyOrders,
      },
      {
        path: "/dashboard/customer-orders",
        Component: CustomerOrder,
      },
      {
        path: "/dashboard/customer-contact",
        Component: CustomerContact,
      },
      // {
      //   path: "/dashboard/my-application",
      //   Component: MyApplication,
      // },
      {
        path: "/dashboard/add-tuition",
        Component: AddProducts,
      },
      {
        path: "/dashboard/add-hero-photo",
        Component: AddHeroPhoto,
      },
      {
        path: "/dashboard/profile",
        Component: MyProfile,
      },
      {
        path: "/dashboard/edit-profile",
        Component: EditProfile,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
