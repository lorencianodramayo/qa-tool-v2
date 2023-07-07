import {useRoutes, Navigate} from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import DashboardLayout from './pages/DashboardLayout'
import ConfigureLayout from './pages/ConfigureLayout'
import UploadLayout from './pages/v3/UploadLayout'
import ElementsLayout from './pages/ElementsLayout'
import DoneLayout from './pages/DoneLayout'
import ConceptTemplateVersionLayout from './pages/ConceptTemplateVersionLayout'
import SharedVariantsLayout from './pages/SharedVariantsLayout'

import GoogleSSOSuccess from './pages/GoogleSSOSuccess'
import GoogleSSOError from './pages/GoogleSSOError'

import NotFound from './pages/Page404'
import ConfigureTemplateLayout from './pages/v3/ConfigureTemplateLayout'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/signin" />, index: true },
        // {element: <Navigate to="/qa-tool-v2/configure/generate" />, index: true},
        {element: <Navigate to="/qa-tool-v3/upload" />, index: true},
        //
        {path: 'qa-tool-v2/configure/generate', element: <ConfigureLayout />},
        {path: 'qa-tool-v2/configure/generate/elements', element: <ElementsLayout />},
        //
        {path: 'qa-tool-v3/upload', element: <UploadLayout />},
        {path: 'qa-tool-v3/configure/template/:uploadID', element: <ConfigureTemplateLayout />},
        {
          path: 'qa-tool-v2/configure/generate/elements/done',
          element: <DoneLayout />,
        },
        {
          path: 'qa-tool-v2/concept_template_version',
          element: <ConceptTemplateVersionLayout />,
        },
      ],
    },

    {path: 'signin', element: <SignIn />},
    {path: 'signup', element: <SignUp />},
    {path: 'qa-tool-v2/:sharedVariantsId', element: <SharedVariantsLayout />},

    {path: 'googleSSOSuccess', element: <GoogleSSOSuccess />},
    {path: 'googleSSOError', element: <GoogleSSOError />},

    {path: '404', element: <NotFound />},
    {path: '*', element: <Navigate to="/404" replace />},
  ])
}
