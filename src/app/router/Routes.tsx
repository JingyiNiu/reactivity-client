import App from "../layout/App";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import Login from "../../features/users/Login";
import Register from "../../features/users/Register";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {path: 'activities', element: <ActivityDashboard />},
      {path: 'activities/:id', element: <ActivityDetails />},
      {path: 'createActivity', element: <ActivityForm key='create' />},
      {path: 'manage/:id', element: <ActivityForm key='manage' />},
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
