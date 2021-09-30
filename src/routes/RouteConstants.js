import { LoginCallback } from '@okta/okta-react';
import PageNotFound from '../components/common/PageNotFound';
import Login from '../Pages/Login/Login';
import Accredited from '../Pages/Accredited/Accredited';
import Dashboard from '../Pages/Dashboard/Dashboard';
import FacilityList from '../Pages/Facility/FacilityList';
import UserList from '../Pages/User/UserList';
import RegistrarList from '../Pages/Registrar/RegistrarList';
import ForbiddenAccessPage from '../components/common/ForbiddenAccessPage/ForbiddenAccessPage';

export const ROUTE_CONSTANTS = [
  {
    path: '/',
    authenticated: true,
  },
  {
    path: '/forbidden-access',
    component: ForbiddenAccessPage,
    escapeRedirect: true,
  },
  {
    path: '/Login',
    component: Login,
    authenticated: false,
  },
  {
    path: '/callback',
    component: LoginCallback,
    escapeRedirect: false,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    authenticated: true,
  },
  {
    path: '/users',
    component: UserList,
    authenticated: true,
  },
  {
    path: '/accredited',
    component: Accredited,
    authenticated: true,
  },
  {
    path: '/accredited/:step',
    component: Accredited,
    authenticated: true,
  },
  {
    path: '/accredited/:step/:subStep',
    component: Accredited,
    authenticated: true,
  },
  {
    path: '/facility',
    component: FacilityList,
    authenticated: true,
  },
  {
    path: '/registrar',
    component: RegistrarList,
    authenticated: true,
  },
  {
    path: '*',
    component: PageNotFound,
    escapeRedirect: true,
  },
];
