import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from './Button/Button';
import { errorNotification } from './common/NotifyToaster';
import { uploadAccreditedFile } from '../Pages/Accredited/redux/AccreditedReduxActions';

const attachmentsWithExcel = [
  'Orientation is provided to each registrar at commencement - please attach the registrar specific orientation checklist/materials used by the practice.',
  'I have hospital clinical privileges',
];

const fileExtensionWithExcel = ['jpeg', 'jpg', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
const mimeTypeWithExcel = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const fileExtension = ['jpeg', 'jpg', 'pdf', 'doc', 'docx'];
const mimeType = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
];

const FileUploadButton = props => {
  const { data, index, formName, subFormName, subFormField, isEditable, existFiles } = props;
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const handleInputFileBlockClick = () => {
    hiddenFileInput.current.click();
  };

  const finalFileExtension = useMemo(() => {
    if (attachmentsWithExcel?.includes(data?.title)) {
      return fileExtensionWithExcel;
    }
    return fileExtension;
  }, [data, attachmentsWithExcel]);

  const finalMimeTypes = useMemo(() => {
    if (attachmentsWithExcel?.includes(data?.title)) {
      return mimeTypeWithExcel;
    }
    return mimeType;
  }, [data, attachmentsWithExcel]);

  const uploadFile = useCallback(
    async file => {
      if (!file) {
        errorNotification('Please select file to upload!');
      } else {
        try {
          const formData = new FormData();
          file?.forEach(e => {
            formData.append('file', e);
          });
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          await dispatch(
            uploadAccreditedFile(existFiles, formData, config, formName, subFormName, index, subFormField),
          );
        } catch (e) {
          /**/
        }
      }
    },
    [existFiles, formName, subFormName, index, subFormField],
  );

  const handleChange = useCallback(
    async e => {
      e.preventDefault();
      if (e.target.files && e.target.files.length > 0) {
        // const checkFileSize = [];

        const files = [...e?.target?.files];

        const fileValidate = files?.map(file => {
          const checkExtension = finalFileExtension.indexOf(file.name.split('.').splice(-1)[0]) !== -1;
          const checkMimeTypes = finalMimeTypes.indexOf(file.type) !== -1;
          if (!(checkExtension || checkMimeTypes)) {
            errorNotification(
              !finalFileExtension?.includes('xls')
                ? `Error in ${file?.name}, Only PDF, DOC, DOCX, JPEG, JPG file type allowed.`
                : `Error in ${file?.name}, Only PDF, DOC, DOCX, JPEG, JPG, XLS, XLSX file type allowed`,
            );
            return false;
          }
          // checkFileSize.push(file.size);
          return true;
        });

        const isValid = fileValidate?.every(valid => valid);
        if (isValid) await uploadFile(files);
      }
    },
    [uploadFile, finalMimeTypes, finalFileExtension],
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
