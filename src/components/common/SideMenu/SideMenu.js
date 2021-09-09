import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../../assets/images/sidebar_menu/sidebar_logo.svg';
import { SideMenuConstants } from './SideMenuConstants';
import lightELogo from '../../../assets/images/login_images/light-ev-logo.svg';
import { useOnClickOutside } from '../../../hooks/UserClickOutsideHook';

const SideMenu = props => {
  const sideBarRef = useRef();
  const { className, onMenuCloseClick } = props;
  const [finalSideBar, setFinalSideBar] = useState([]);

  const { role } = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});

  useEffect(() => {
    const sideBar = [...SideMenuConstants];
    switch (role) {
      case 'Super_Admin':
      case 'Accreditation_Support_Coordinator':
        setFinalSideBar(sideBar);
        break;
      case 'Principal_Supervisor':
      case 'Practice_Manager': {
        sideBar.splice(2, 3);
        setFinalSideBar(sideBar);
        break;
      }
      case 'Supervisor':
      case 'Accreditor': {
        sideBar.splice(2);
        setFinalSideBar(sideBar);
        break;
      }
      default:
        setFinalSideBar(SideMenuConstants.slice(0, 1));
    }
  }, [role, SideMenuConstants]);

  useOnClickOutside(sideBarRef, () => {
    onMenuCloseClick();
  });

  return (
    <div className={`side-menu-container ${className}`} ref={sideBarRef}>
      <div className="side-menu-logo">
        <img alt="EVGP" src={logo} />
        <span className="material-icons-round menu-open" onClick={onMenuCloseClick}>
          menu_open
        </span>
      </div>
      <div className="menu-container">
        {finalSideBar.map(item => (
          <NavLink key={item.url} className="menu" to={item.url} replace>
            <span className="material-icons-round">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
      <img src={lightELogo} className="side-menu-evgp-bg-logo" />
    </div>
  );
};

SideMenu.propTypes = {
  className: PropTypes.string,
  onMenuCloseClick: PropTypes.func,
};

SideMenu.defaultProps = {
  className: '',
  onMenuCloseClick: () => {},
};

export default SideMenu;
