import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Modal from '../../../Modal/Modal';

const UserProfile = () => {
  const [isProfile, setIsProfileModal] = useState(false);
  const toggleProfileModal = useCallback(() => {
    setIsProfileModal(!isProfile);
  }, [isProfile]);

  const userDetails = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});

  const profileModalButtons = useMemo(
    () => [
      {
        title: 'Close',
        buttonType: 'outlined-active',
        onClick: toggleProfileModal,
      },
    ],
    [toggleProfileModal],
  );

  return (
    <>
      <div className="user-setting-item" onClick={toggleProfileModal}>
        <span className="material-icons-round">person</span> Profile
      </div>
      {isProfile && (
        <Modal header="User Profile" buttons={profileModalButtons} className="user-profile-modal">
          <div className="user-profile-detail-wrapper">
            <span>Name</span>
            <div className="user-profile-detail-value">{`${userDetails?.firstName} ${userDetails?.lastName}`}</div>
          </div>
          <div className="user-profile-detail-wrapper">
            <span>Email</span>
            <div className="user-profile-detail-value">{`${userDetails?.email}`}</div>
          </div>
          <div className="user-profile-detail-wrapper">
            <span>Role</span>
            <div className="user-profile-detail-value">{`${_.startCase(_.lowerCase(userDetails?.role))}`}</div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default UserProfile;
