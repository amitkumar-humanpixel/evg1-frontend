import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import { StringCast } from '../../helpers/StringCastingHelper';
import { getFacilityUsers, resetFacilityUsers } from '../../Pages/Facility/redux/FacilityReduxActions';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import Loader from '../Loader/Loader';
import Table from '../Table/Table';

const ViewTableDetails = props => {
  const { heading, details, onCloseModal, fromModule } = props;
  const windowHeight = useWindowHeight();
  const dispatch = useDispatch();

  const { staffDetails, headers } = useSelector(({ facilityReducer }) => facilityReducer?.facilityUserList ?? {});

  const { isFacilityUserLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const mobileHeadersForFacilityUsers = [
    {
      label: 'User Id',
      name: 'userId',
      type: 'string',
    },
    {
      label: 'First Name',
      name: 'firstName',
      type: 'string',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'string',
    },
  ];

  const viewModalButtons = useMemo(
    () => [{ title: 'Close', buttonType: 'primary', onClick: onCloseModal }],
    [onCloseModal],
  );

  useEffect(() => {
    if (fromModule === 'facility') {
      dispatch(getFacilityUsers(details?.facilityId));
    }
    return () => dispatch(resetFacilityUsers());
  }, [fromModule]);

  const modalDetails = Object.entries(details).filter(([key]) => !['id', 'accreditionId'].includes(key));

  return (
    <Modal header={heading} buttons={viewModalButtons} className="view-table-detail-modal">
      <div className="modal-details-wrapper">
        {!isFacilityUserLoader ? (
          <>
            <div className="modal-details-grid">
              {modalDetails?.map(([key, value]) => (
                <div className="label-value-grid">
                  <span>{StringCast(key)}</span>
                  <div className="detail-value-field">{value}</div>
                </div>
              ))}
            </div>
            {fromModule === 'facility' && (
              <>
                {staffDetails?.length > 0 ? (
                  <div className="common-list-container mt-20" style={{ maxHeight: `${windowHeight - 236}px` }}>
                    <Table
                      align="left"
                      valign="center"
                      tableClass="main-list-table"
                      data={staffDetails}
                      mobileHeaders={mobileHeadersForFacilityUsers}
                      headers={headers}
                    />
                  </div>
                ) : (
                  <div className="no-record-found">No user record found</div>
                )}
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </Modal>
  );
};

ViewTableDetails.propTypes = {
  heading: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  fromModule: PropTypes.string,
};

ViewTableDetails.defaultProps = {
  fromModule: '',
};

export default ViewTableDetails;
