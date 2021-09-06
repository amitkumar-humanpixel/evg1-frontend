import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuthTokenFromLocalStorage } from '../helpers/LocalStorageHelper';

export const AuthenticatedRoute = ({ component, ...options }) => {
  const authToken = getAuthTokenFromLocalStorage();
  if (!authToken?.accessToken?.claims?.sub) {
    return (
      <Route {...options}>
        <Redirect
          to={{
            pathname: '/login',
            state: { referrer: options?.location?.pathname, search: options?.location?.search },
          }}
        />
      </Route>
    );
  }

  if (options.path !== '/dashboard' && !component) {
    return (
      <Route {...options}>
        <Redirect to="/dashboard" />
      </Route>
    );
  }

  return (
    // <motion.div initial={{ opacity: 0.2 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }}>
    <Route {...options} component={component} />
    // </motion.div>
  );
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AuthenticatedRoute.defaultProps = {
  component: null,
};
