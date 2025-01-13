import { lazy } from "react";
const Home = lazy(() => Wait().then(() => import("../pages/Home")));
const Dashboard = lazy(() => Wait().then(() => import("../pages/Dashboard")));

const Wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const RouteConfig = [
  {
    path: "/",
    component: <Home />,
  },
];

const UserRouteConfig = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
];

export { RouteConfig, UserRouteConfig };
