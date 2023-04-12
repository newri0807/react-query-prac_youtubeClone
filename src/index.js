import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Video from "./pages/Video";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>errorPage</div>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/video/:id",
        element: <Video />,
      },
      {
        path: "/detail/:channelId/:id",
        element: <Detail />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* devtools */}
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
