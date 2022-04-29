import Dashboard from "./components/views/Dashboard";
import LendBorrow from "./components/views/Lend-Borrow";
import Metamask from "./components/views/Metamask";


const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/lend-borrow",
    component: LendBorrow,
  },
  {
    path: "/liquidation",
    component: Dashboard
  }
]

export default routes;
