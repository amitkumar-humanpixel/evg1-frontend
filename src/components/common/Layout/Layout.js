import PropTypes from 'prop-types';
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';
import { useWindowHeight } from '../../../hooks/useWindowHeight';
import { getAuthTokenFromLocalStorage } from '../../../helpers/LocalStorageHelper';

const Layout = props => {
  const { children } = props;
  const windowHeight = useWindowHeight();
  const { authState } = useOktaAuth();
  const authToken = getAuthTokenFromLocalStorage();
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  if (!authToken || !authToken?.accessToken?.claims?.sub) {
    localStorage.removeItem('userDetails');
    return children;
  }

  return (
    <div style={{ height: windowHeight }}>
      {authState?.isAuthenticated && (
        <div className="layout-wrapper">
          <SideMenu className={showBurgerMenu && 'show-side-menu'} onMenuCloseClick={() => setShowBurgerMenu(false)} />
          <div className="right-side-container">
            <Header onBurgerMenuClick={() => setShowBurgerMenu(true)} />
            <div className="page-container">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};
