import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from './Button/Button';
import { errorNotification } from './common/NotifyToaster';
import {
  uploadAccreditedFormA1File,
  uploadAccreditedFormAFile,
} from '../Pages/Accredited/redux/AccreditedReduxActions';
import { useQueryParams } from '../hooks/GetQueryParamHook';

const FileUploadButton = props => {
  const { data, index, formName, subFormName, subFormField, isEditable, existFiles } = props;
  const { id } = useQueryParams();
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const handleInputFileBlockClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = useCallback(
    async file => {
      if (!file) {
        errorNotification('Please select file to upload!');
      } else {
        try {
          const formData = new FormData();
          formData.append('title', data?.title);
          formData.append('status', data?.status);
          file?.forEach(e => {
            formData.append('file', e);
          });
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          if (formName === 'formA') {
            await dispatch(uploadAccreditedFormAFile(existFiles, formData, config, formName, subFormName, index, id));
          } else {
            await dispatch(
              uploadAccreditedFormA1File(existFiles, formData, config, formName, subFormName, index, subFormField, id),
            );
          }
        } catch (e) {
          /**/
        }
      }
    },
    [existFiles, formName, subFormName, index, subFormField, id, data],
  );

  const handleChange = useCallback(
    async e => {
      e.preventDefault();
      if (e.target.files && e.target.files.length > 0) {
        const files = [...e?.target?.files];
        const fileValidate = files?.map(file => {
          const checkExtension = data?.allowedFileTypes.indexOf(file.name.split('.').splice(-1)[0]) !== -1;
          const checkMimeTypes = data?.allowedFileMimeTypes.indexOf(file.type) !== -1;
          if (!(checkExtension || checkMimeTypes)) {
            errorNotification(
              `Error in ${file?.name}, only ${data?.allowedFileTypes.map(type => type).join(', ')} file type allowed.`,
            );
            return false;
          }
          return true;
        });

        const isValid = fileValidate?.every(valid => valid);
        if (isValid) await uploadFile(files);
      }
    },
    [uploadFile, data],
  );

  return (
    <Button buttonType="bg" className="attach-button" onClick={handleInputFileBlockClick}>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={hiddenFileInput}
        onChange={handleChange}
        disabled={!isEditable}
        multiple
      />
      <span className="material-icons">cloud_upload</span> {data?.filePath?.length > 0 ? 'Uploaded' : 'Attach'}
    </Button>
  );
};

FileUploadButton.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  subFormName: PropTypes.string.isRequired,
  subFormField: PropTypes.string,
  isEditable: PropTypes.bool,
  existFiles: PropTypes.array.isRequired,
};

FileUploadButton.defaultProps = {
  subFormField: '',
  isEditable: false,
};
export default FileUploadButton;
