import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import LandingPage from "./views/LandingPage.jsx";
import Blogs from "./views/Blogs.jsx";
import BlogDetail from "./views/BlogDetail.jsx";
import UserLogin from "./views/UserLogin.jsx";
import UserRegister from "./views/UserRegister.jsx";
import Portfolio from "./views/Portfolio.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signin",
        element: <UserLogin />,
      },
      {
        path: "/signup",
        element: <UserRegister />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetail />,
      },
      {
        path: "/portfolios",
        element: <Portfolio />,
      },
    ],
  },
]);

export default router;
