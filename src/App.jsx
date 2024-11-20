import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Chat, LandingPage } from "./components";
import Error404 from "./components/pages/Error404";
import { ThemeProvider } from "@/components/theme-provider";
import Auth from "./components/Auth";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<LandingPage />} />
      <Route path="auth" element={<Auth />} />
      <Route path="chat-box" element={<Chat />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
