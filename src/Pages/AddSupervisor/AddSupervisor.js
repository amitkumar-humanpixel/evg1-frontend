import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import GetComponentByType from '../../components/common/getComponentByType/getComponentByType';
import {
  AddNewSupervisorDetails,
  resetAddSupervisorData,
  updateAddSupervisorDetails,
} from './redux/AddSupervisorReduxActions';
import { EMAIL_ADDRESS_REGEX } from '../../constants/RegexConstants';
import Modal from '../../components/Modal/Modal';

const AddSupervisor = props => {
  const { toggleAddNewSupervisorModal, isAddNewSupervisorModal } = props;
  const dispatch = useDispatch();
  const USER_ID = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails?.userId ?? undefined);
  const { firstName, lastName, email, errors } = useSelector(({ addSupervisorReducer }) => addSupervisorReducer ?? {});

  const { addNewSupervisorLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const SupervisorDetails = useMemo(
    () => [
      {
        type: 'input',
        title: 'First Name',
        name: 'firstName',
        placeholder: 'Enter first name',
        value: firstName,
        error: errors?.firstName,
        isEditable: true,
      },
      {
        type: 'input',
        title: 'Last Name',
        name: 'lastName',
        placeholder: 'Enter last name',
        value: lastName,
        error: errors?.lastName,
        isEditable: true,
      },
      {
        type: 'input',
        title: 'Email',
        name: 'email',
        placeholder: 'Enter email address',
        value: email,
        error: errors?.email,
        isEditable: true,
      },
    ],
    [firstName, lastName, email, errors],
  );

  const onInputChange = useCallback((name, value) => {
    dispatch(updateAddSupervisorDetails(name, value));
  }, []);

  const onCloseAddSupervisorModal = useCallback(() => {
    dispatch(resetAddSupervisorData());
    toggleAddNewSupervisorModal();
  }, [toggleAddNewSupervisorModal]);

  const addNewSupervisor = useCallback(() => {
    const error = {};
    let validated = true;
    const finalData = {
      firstName,
      lastName,
      email,
    };

    if (!finalData?.firstName || finalData?.firstName?.toString()?.trim()?.length === 0) {
      validated = false;
      error.firstName = 'Please Enter first name!';
    }
    if (!finalData?.lastName || finalData?.lastName?.toString()?.trim()?.length === 0) {
      validated = false;
      error.lastName = 'Please Enter last name!';
    }
    if (!finalData?.email || finalData?.email?.toString()?.trim()?.length === 0) {
      validated = false;
      error.email = 'Please Enter email address!';
    }
    if (finalData?.email && !EMAIL_ADDRESS_REGEX.test(finalData?.email)) {
      validated = false;
      error.email = 'Please Enter valid email address!';
    }
    dispatch(updateAddSupervisorDetails('errors', error));
    if (validated && USER_ID !== undefined) {
      try {
        dispatch(AddNewSupervisorDetails(USER_ID, finalData));
        onCloseAddSupervisorModal();
      } catch (e) {
        /**/
      }
    }
  }, [firstName, lastName, email, USER_ID, onCloseAddSupervisorModal]);

  const addSupervisorModalButtons = useMemo(
    () => [
      {
        title: 'Close',
        buttonType: 'outlined-active',
        onClick: onCloseAddSupervisorModal,
      },

      {
        title: 'Save',
        buttonType: 'primary',
        onClick: addNewSupervisor,
        isLoading: addNewSupervisorLoader,
      },
    ],
    [addNewSupervisor, onCloseAddSupervisorModal, addNewSupervisorLoader],
  );

  return (
    <>
      {isAddNewSupervisorModal && (
        <Modal header="Add Supervisor" buttons={addSupervisorModalButtons} className="add-supervisor-modal">
          <div className=" add-supervisor">
            <section className="common-white-container">
              <div className="add-supervisor-details-grid">
                {SupervisorDetails.map(detail => (
                  <GetComponentByType input={detail} onInputChange={onInputChange} />
                ))}
              </div>
            </section>
          </div>
        </Modal>
      )}
    </>
  );
};

AddSupervisor.propTypes = {
  toggleAddNewSupervisorModal: PropTypes.func.isRequired,
  isAddNewSupervisorModal: PropTypes.bool.isRequired,
};

export default AddSupervisor;
