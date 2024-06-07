import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { EmpList } from 'pages/emp-list';
import { EmpDetails } from 'pages/emp-details';
import { EmpScale } from 'pages/emp-scale';
import { EmpCreate } from 'pages/emp-create';
import { EmpEdit } from 'pages/emp-edit';
import { VnfdList } from 'pages/vnfd-list';
import { LcmopoccList } from 'pages/lcmopocc-list';

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
// const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));
// render - applications

const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
// const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
// const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
// const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
// const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
// const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

// const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
// const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
// const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
// const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,

  children: [
    {
      path: '',

      element: <EmpList />,
    },
    {
      path: '/vnf/list',

      element: <EmpList />,
    },
    {
      path: '/vnfd/list',

      element: <VnfdList />,
    },
    {
      path: '/vnf/lcmopocc/:name',

      element: <LcmopoccList />,
    },
    {
      path: '/vnf/details/:name',
      element: <EmpDetails />,
    },
    {
      path: '/vnf/scale/:name',
      element: <EmpScale />,
    },
    {
      path: '/vnf/create',
      element: <EmpCreate />,
    },
    {
      path: '/employee/edit/:id',
      element: <EmpEdit />,
    },
  ],
};

export default MainRoutes;
