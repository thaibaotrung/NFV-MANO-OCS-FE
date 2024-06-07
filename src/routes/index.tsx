import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthLayout from 'layout/Auth';
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));

const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
// types

// render - landing page

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AuthLogin />,
        },
      ],
    },
    LoginRoutes,
    MainRoutes,
  ],
  { basename: process.env.REACT_APP_BASE_NAME }
);

export default router;
