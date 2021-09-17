import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Layout from '../components/common/Layout/Layout';
import { ROUTE_CONSTANTS } from './RouteConstants';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { NonAuthenticatedRoute } from './NonAuthenticatedRoute';
import oktaConfig from '../config';
import { getAuthTokenFromLocalStorage } from '../helpers/LocalStorageHelper';
import { getLoggedUserDetails } from '../Pages/Login/redux/LoginActions';

const Routes = () => {
  const oktaAuth = new OktaAuth(oktaConfig);
  const authToken = getAuthTokenFromLocalStorage();

  const dispatch = useDispatch();

  useEffect(async () => {
    if (authToken?.accessToken?.claims?.sub) {
      try {
        const response = await dispatch(getLoggedUserDetails(authToken?.accessToken?.claims?.sub));
        const USER_ID = JSON.stringify(response?.userId);
        localStorage.setItem('userDetails', USER_ID);
      } catch (e) {
        /**/
      }
    }
    return () => {
      localStorage.removeItem('userDetails');
    };
  }, [authToken?.accessToken?.claims?.sub]);

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Layout>
          <Switch>
            {ROUTE_CONSTANTS.map(({ path, component, authenticated, escapeRedirect }) => {
              const Component = authenticated ? AuthenticatedRoute : NonAuthenticatedRoute;
              return <Component key={path} exact path={path} component={component} escapeRedirect={escapeRedirect} />;
            })}
          </Switch>
        </Layout>
      </Security>
    </Router>
  );
};
export default Routes;
