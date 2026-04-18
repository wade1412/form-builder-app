import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import FormBuilderPage from "./pages/FormBuilderPage.tsx";
import FormFillerPage from "./pages/FormFillerPage.tsx";
import FormResponsesPage from "./pages/FormResponsesPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/forms/new", element: <FormBuilderPage /> },
  { path: "/forms/:id/fill", element: <FormFillerPage /> },
  { path: "/forms/:id/responses", element: <FormResponsesPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
