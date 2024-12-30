import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignupForm from "./components/SignupForm";
import SignupLayout from "./pages/Signup";
import LoginForm from "./components/LoginForm";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Blogs from "./pages/Blogs";
import Protected from "./components/Protected";

import { Toaster } from "react-hot-toast";
import UserProvider from "./context/UserProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/signup" element={<SignupLayout />}>
              <Route index element={<SignupForm />} />
              <Route path="login" element={<LoginForm />} />
            </Route>
            <Route
              path="/blogs"
              element={
                <Protected>
                  <Blogs />
                </Protected>
              }
            />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
