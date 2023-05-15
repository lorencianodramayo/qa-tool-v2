import { useRoutes, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import DashboardLayout from "./pages/DashboardLayout";
import ConfigureLayout from "./pages/ConfigureLayout";
import ElementsLayout from "./pages/ElementsLayout";
import DoneLayout from "./pages/DoneLayout";
import ConceptTemplateVersionLayout from "./pages/ConceptTemplateVersionLayout";
import SharedVariantsLayout from "./pages/SharedVariantsLayout";

import GoogleSSOSuccess from "./pages/GoogleSSOSuccess";
import GoogleSSOError from "./pages/GoogleSSOError";

import NotFound from "./pages/Page404";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/signin" />, index: true },
        { element: <Navigate to="/configure/generate" />, index: true },
        { path: "configure/generate", element: <ConfigureLayout /> },
        { path: "configure/generate/elements", element: <ElementsLayout /> },
        {
          path: "configure/generate/elements/done",
          element: <DoneLayout />,
        },
        {
          path: "concept_template_version",
          element: <ConceptTemplateVersionLayout />,
        },
      ],
    },

    { path: "signin", element: <SignIn /> },
    { path: "signup", element: <SignUp /> },
    { path: "/:sharedVariantsId", element: <SharedVariantsLayout /> },

    { path: "googleSSOSuccess", element: <GoogleSSOSuccess /> },
    { path: "googleSSOError", element: <GoogleSSOError /> },

    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
