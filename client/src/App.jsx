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
import { SignInPage } from "./pages/signin/SignInPage";
import { SignUpPage } from "./pages/signup/SignUpPage";


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
        element: <SignInPage />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
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