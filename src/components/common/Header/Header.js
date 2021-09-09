import React, { useCallback, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useOktaAuth } from '@okta/okta-react';
import { useSelector } from 'react-redux';
import { useOnClickOutside } from '../../../hooks/UserClickOutsideHook';
import dummy from '../../../assets/images/header/dummy.svg';
import { SideMenuConstants } from '../SideMenu/SideMenuConstants';
import { successNotification } from '../NotifyToaster';
import UserProfile from './components/UserProfile';
import { clearUserDetailsFromLocalStorage } from '../../../helpers/LocalStorageHelper';

const Header = props => {
  const { onBurgerMenuClick } = props;
  const { oktaAuth, authState } = useOktaAuth();
  const userSettingsRef = useRef();

  const [showUserSettings, setShowUserSettings] = React.useState(false);

  // for accreditation title
  const { accreditionName } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const toggleUserSettings = value => setShowUserSettings(value !== undefined ? value : e => !e);

  const handleLogoutButtonClick = useCallback(async () => {
    try {
      await oktaAuth.signOut();
      clearUserDetailsFromLocalStorage();
      successNotification('Logged out successfully!');
    } catch (e) {
      /**/
    }
  }, [oktaAuth]);

  useOnClickOutside(userSettingsRef, () => toggleUserSettings(false));

  return (
    <div className="header-wrapper">
      <div className="header-left-part">
        <span className="material-icons-round burger-menu" onClick={onBurgerMenuClick}>
          menu
        </span>
        <div className="page-title">
          <Switch>
            {SideMenuConstants.map(route => (
              <Route path={route.url}>
                {route.title === 'Accreditation' && accreditionName
                  ? `Accreditation - ${accreditionName ?? ''}`
                  : route.title}
              </Route>
            ))}
          </Switch>
        </div>
      </div>
      <img className="user-dp" src={dummy} onClick={toggleUserSettings} />
      {showUserSettings && authState.isAuthenticated && (
        <div ref={userSettingsRef} className="user-settings">
          <UserProfile />
          <div className="user-setting-item" onClick={handleLogoutButtonClick}>
            <span className="material-icons-round">exit_to_app</span> Logout
          </div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  onBurgerMenuClick: PropTypes.func,
};

Header.defaultProps = {
  onBurgerMenuClick: () => {},
};

export default Header;
