import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import AddParcel from "../Pages/AddParcel/AddParcel";
import PrivetRoute from "../routes/PrivetRoute";
import MyParcel from "../Pages/Dashboard/MyParcels/MyParcel";
import Dashboardlayout from "../Layouts/Dashboardlayout";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "forbidden",
        Component: Forbidden
      },
      {
        path: "addparcel",
        element: (
          <PrivetRoute>
            {" "}
            <AddParcel />
          </PrivetRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "beARider",
        element: (
          <PrivetRoute>
            <BeARider></BeARider>
          </PrivetRoute>
        ),
        loader: () => fetch("/coverageData.json"),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        {" "}
        <Dashboardlayout></Dashboardlayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "myparcel",
        Component: MyParcel,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "pendingRiders",
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>,
      },
      {
        path: "activeRiders",
        element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>,
      },
      {
        path: "assignRider",
        element: <AdminRoute><AssignRider></AssignRider></AdminRoute>,
      },
      {
        path: "makeAdmin",
        element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>,
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
]);
