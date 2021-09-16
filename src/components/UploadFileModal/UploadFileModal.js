import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { errorNotification } from '../common/NotifyToaster';
import { uploadUserCSVFile } from '../../Pages/User/redux/UserReduxActions';
import { uploadFacilityCSVFile, uploadFacilityStaffCSVFile } from '../../Pages/Facility/redux/FacilityReduxActions';
import { uploadRegistrarCSVFile } from '../../Pages/Registrar/redux/RegistrarReduxActions';
import Modal from '../Modal/Modal';

const HEADER_BY_MODULE = {
  USER: 'Upload Users',
  REGISTRAR: 'Upload Registrars',
  FACILITY: 'Upload Facilities',
  FACILITY_STAFF: 'Upload Facility Staff',
};

const UploadFileModal = props => {
  const { module } = props;
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [isUploadModal, setIsUpdateModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const { role } = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});

  const { isCSVUploadLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const handleInputFileBlockClick = () => {
    hiddenFileInput.current.click();
  };

  const onCloseUploadModal = useCallback(() => {
    setSelectedFile({});
    setIsUpdateModal(false);
  }, []);

  const onUploadFile = useCallback(async () => {
    if (!selectedFile) {
      errorNotification('Please select file to upload!');
    } else {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const config = {
          headers: {
            'content-type': 'text/csv',
          },
        };
        switch (module) {
          case 'USER':
            await dispatch(uploadUserCSVFile(formData, config));
            break;
          case 'FACILITY':
            await dispatch(uploadFacilityCSVFile(formData, config));
            break;
          case 'REGISTRAR':
            await dispatch(uploadRegistrarCSVFile(formData, config));
            break;
          case 'FACILITY_STAFF':
            await dispatch(uploadFacilityStaffCSVFile(formData, config));
            break;
          default:
            break;
        }
        setIsUpdateModal(false);
        setSelectedFile({});
      } catch (e) {
        /**/
      }
    }
  }, [selectedFile, module]);

  const uploadFileModalButtons = useMemo(
    () => [
      {
        title: 'Close',
        buttonType: 'outlined-active',
        onClick: onCloseUploadModal,
      },
      {
        title: 'Upload',
        buttonType: 'primary',
        onClick: onUploadFile,
        isLoading: isCSVUploadLoader,
      },
    ],
    [onCloseUploadModal, onUploadFile, isCSVUploadLoader],
  );

  const handleChange = useCallback(e => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const fileExtension = ['csv'];
      const mimeType = ['text/csv'];
      const checkExtension = fileExtension.indexOf(e.target.files[0].name.split('.').splice(-1)[0]) !== -1;
      const checkMimeTypes = mimeType.indexOf(e.target.files[0].type) !== -1;

      if (!(checkExtension || checkMimeTypes)) {
        errorNotification('Only csv file types are allowed');
      } else {
        setSelectedFile(e.target.files[0]);
      }
    }
  }, []);

  return (
    <>
      <Button
        buttonType="primary"
        className="ml-10"
        title={HEADER_BY_MODULE[module]}
        onClick={() => setIsUpdateModal(true)}
        isDisabled={['Accreditation_Support_Coordinator'].includes(role) && module === 'USER'}
      />
      {isUploadModal && (
        <Modal header={HEADER_BY_MODULE[module]} buttons={uploadFileModalButtons} className="upload-file-modal">
          <div className="upload-file-wrapper" onClick={handleInputFileBlockClick}>
            <span className="material-icons-round">cloud_upload</span>
            <span className="upload-file-text">{selectedFile?.name ?? 'Upload CSV'}</span>
            <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} />
          </div>
        </Modal>
      )}
    </>
  );
};

UploadFileModal.propTypes = {
  module: PropTypes.string.isRequired,
};

export default UploadFileModal;
