import Dashboard from "./containers/Dashboard";
// Layout Types
import { defaultLayout } from "./layouts";

export const publicRoutes = [
  {
    path: "/",
    exact: true,
    layout: defaultLayout,
    component: Dashboard
  },
]