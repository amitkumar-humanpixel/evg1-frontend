import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuthTokenFromLocalStorage } from '../helpers/LocalStorageHelper';

export const NonAuthenticatedRoute = ({ escapeRedirect, component: Component, ...options }) => {
  const authToken = getAuthTokenFromLocalStorage();
  if (authToken?.accessToken?.claims?.sub && !escapeRedirect) {
    return (
      <Route {...options}>
        <Redirect to="/dashboard" />
      </Route>
    );
  }

  return <Route {...options} component={Component} />;
};

NonAuthenticatedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  escapeRedirect: PropTypes.bool,
};
NonAuthenticatedRoute.defaultProps = {
  component: null,
  escapeRedirect: false,
};
