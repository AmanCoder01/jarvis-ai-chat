import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { HomePage } from "./pages/homepage/HomePage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ChatPage } from "./pages/chatpage/ChatPage.jsx";
import { RootLayout } from "./layouts/rootLayout/RootLayout";
import { DashboardLayout } from "./layouts/dashboardLayout/DashboardLayout";
import { SigninPage } from "./pages/signin/SignInPage.jsx";
import { SignUpPage } from "./pages/signup/SignUpPage.jsx";
import { Verify } from "./pages/signup/Verify.jsx";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/sign-in",
        element: <SigninPage />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      },
      {
        path: "/verify",
        element: <Verify />
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />
          }
        ]
      }
    ]
  }
])


const App = () => {


  return (
    <RouterProvider router={router} />
  )
}

export default App