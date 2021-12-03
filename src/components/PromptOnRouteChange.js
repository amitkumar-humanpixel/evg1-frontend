import _ from 'lodash';
import { Prompt, useHistory } from 'react-router-dom';
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal/Modal';

const PromptOnRouteChange = props => {
  const { data, dataCopy } = props;

  const history = useHistory();
  const currentPath = `${history.location.pathname}${history.location.search}`;

  const [alertOnLeftModal, setAlertOnLeftModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [pathToRedirect, setPathToRedirect] = useState('/dashboard');
  const toggleAlertOnLeftModal = useCallback(
    value => setAlertOnLeftModal(value !== undefined ? value : e => !e),
    [setAlertOnLeftModal],
  );

  const handleBlockedRoute = useCallback(
    e => {
      if (currentPath !== `${e.pathname}${e.search}`) {
        toggleAlertOnLeftModal();
        setPathToRedirect(`${e.pathname}${e.search}`);
        return false;
      }
      return true;
    },
    [toggleAlertOnLeftModal, currentPath],
  );

  const alertOnLeftModalButtons = useMemo(
    () => [
      {
        title: 'No',
        buttonType: 'outlined-primary',
        onClick: () => {
          toggleAlertOnLeftModal();
          setAlertOnLeftModal(false);
        },
      },
      {
        title: 'Yes',
        buttonType: 'primary',
        onClick: () => {
          toggleAlertOnLeftModal();
          history.push(pathToRedirect);
        },
      },
    ],
    [toggleAlertOnLeftModal, pathToRedirect],
  );

  return (
    <>
      <Prompt when={!_.isEqual(data, dataCopy) && !alertOnLeftModal} message={handleBlockedRoute} />
      {alertOnLeftModal && (
        <Modal header="Save Details" buttons={alertOnLeftModalButtons}>
          <span className="font-field">There are unsaved changes, Do you want to continue?</span>
        </Modal>
      )}
    </>
  );
};

PromptOnRouteChange.propTypes = {
  data: PropTypes.object.isRequired,
  dataCopy: PropTypes.object.isRequired,
};

export default PromptOnRouteChange;
