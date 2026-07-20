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
import OrderPlace from "../Component/OrderPlace";
import OrderSuccess from "../Component/OrderSuccess";
import Jeans from "../Pages/Jeans";
import Hoodie from "../Pages/Hoodie";
import Jacket from "../Pages/Jacket";
import Sweater from "../Pages/Sweater";
import Shorts from "../Pages/Shorts";
import Shoes from "../Pages/Shoes";
import Belt from "../Pages/Belt";
import Watch from "../Pages/Watch";
import Cap from "../Pages/Cap";
import Sunglass from "../Pages/Sunglass";
import HalfSleeve from "../Pages/HalfSleeve";
import PoloShirt from "../Pages/PoloShirt";
import Trouser from "../Pages/Trouser";
import Chino from "../Pages/Chino";
import Baggy from "../Pages/Baggy";
import AdminRoute from "./AdminRoute";

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
        path: "/order-place",
        Component: OrderPlace,
      },
      {
        path: "/order-success",
        Component: OrderSuccess,
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
        path: "/half-sleeve",
        Component: HalfSleeve,
      },
      {
        path: "/t-shirt",
        Component: TShirt,
      },
      {
        path: "/polo-shirt",
        Component: PoloShirt,
      },
      {
        path: "/trousers",
        Component: Trouser,
      },
      {
        path: "/baggy",
        Component: Baggy,
      },
      {
        path: "/jeans",
        Component: Jeans,
      },
      {
        path: "/chino",
        Component: Chino,
      },
      {
        path: "/panjabi",
        Component: Panjabi,
      },

      {
        path: "/hoodie",
        Component: Hoodie,
      },
      {
        path: "/jacket",
        Component: Jacket,
      },
      {
        path: "/sweater",
        Component: Sweater,
      },
      {
        path: "/shorts",
        Component: Shorts,
      },
      {
        path: "/shoes",
        Component: Shoes,
      },
      {
        path: "/belt",
        Component: Belt,
      },
      {
        path: "/watch",
        Component: Watch,
      },
      {
        path: "/cap",
        Component: Cap,
      },
      {
        path: "/sunglasses",
        Component: Sunglass,
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
            <AdminRoute>
              <AddProductsList></AddProductsList>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/tuition/:id/edit",
        element: (
          <AdminRoute>
            <EditProduct></EditProduct>
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Admin></Admin>
            </AdminRoute>
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
        element: (
          <AdminRoute>
            <CustomerOrder></CustomerOrder>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/customer-contact",
        element: (
          <AdminRoute>
            <CustomerContact></CustomerContact>
          </AdminRoute>
        ),
      },
      // {
      //   path: "/dashboard/my-application",
      //   Component: MyApplication,
      // },
      {
        path: "/dashboard/add-tuition",
        element: (
          <AdminRoute>
            <AddProducts></AddProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-hero-photo",
        element: (
          <AdminRoute>
            <AddHeroPhoto></AddHeroPhoto>
          </AdminRoute>
        ),
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
