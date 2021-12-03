import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  deleteFileFromStandards,
  downloadFileFromStandards,
  getFormAStandardDetails,
  updateAccreditedSubFormArrayFields,
} from '../../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';
import { fileNameExtension, fileNamePrefix } from '../../../../helpers/fileNameSplit';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import { errorNotification } from '../../../../components/common/NotifyToaster';
import { downloadAll } from '../../../../helpers/DownloadHelper';
import PromptOnRouteChange from '../../../../components/PromptOnRouteChange';
import FileUploadButton from '../../../../components/FileUploadButton';

const Standards = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();

  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { standards, standardsCopy } = useSelector(({ accreditedReducer }) => accreditedReducer?.formA ?? {});

  const handleInputChange = useCallback((index, name, value) => {
    dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, name, value));
  }, []);

  const handleFileDownload = useCallback(async fileName => {
    if (fileName) {
      const response = await downloadFileFromStandards(fileName);
      if (response) {
        downloadAll(response);
      } else {
        errorNotification('Download failed, please try again.');
      }
    } else {
      errorNotification('No file found');
    }
  }, []);

  const handleFileDeletion = useCallback(
    (index, file, detail) => {
      if (isEditable) {
        const files = detail?.filePath?.filter(e => e?.fileUrl !== file?.fileUrl);
        const data = { elementId: detail?._id, fileId: file?._id };
        dispatch(deleteFileFromStandards(index, data, files));
      }
    },
    [isEditable],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id) dispatch(getFormAStandardDetails(id));
  }, [id]);

  return (
    <>
      <PromptOnRouteChange data={standards} dataCopy={standardsCopy} />

      <section className="common-white-container" style={{ 'margin-bottom': '20px' }}>
        <p>
          In order for the application to be considered complete, each question must be answered. Some questions will
          require an attachment to be uploaded as part of the response (for example an up to date accreditation
          certificate) for the application to be submitted. If you need to proceed past this point, and return to answer
          questions or upload attachments later, please save at the bottom right of the page and press Next.
        </p>
        <p>
          Incomplete applications will either fail to submit, or be returned for additional information. If you are
          unsure, please contact EV.
        </p>
      </section>
      <section>
        <div className="accredited-title mb-10">Standard Details (To be completed by the Practice Manager)</div>
        <div className="common-white-container standard-detail-table">
          {standards.map((detail, index) => (
            <div className="standard-detail-row">
              <TriStateSwitch
                onChange={state => handleInputChange(index, 'status', state)}
                state={detail?.status}
                className="mr-15"
                disabled={!isEditable}
              />
              <div className="standard-detail">
                <div className="standard-detail-container">
                  <div className="standard-detail-point">
                    {`${index + 1}. ${detail.title}`}
                    {detail?.list && (
                      <ul>
                        {detail.list.map(point => (
                          <li>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {detail?.error && <div className="form-error-message standard-error-message">{detail?.error}</div>}
                  {detail?.isRemark && detail?.status === 'true' && (
                    <div className="remarks-input">
                      <textarea
                        rows={2}
                        name="remarks"
                        placeholder="Detail"
                        value={detail?.remarks}
                        onChange={e => handleInputChange(index, e.target.name, e.target.value)}
                        disabled={!isEditable}
                      />
                    </div>
                  )}
                  {detail?.filePath?.length > 0 &&
                    detail?.filePath?.map(file => (
                      <div className="standard-attached-file">
                        <span className="file-name">
                          <span className="file-name-without-extension">
                            <b>Uploaded File: </b>
                            {fileNamePrefix(file?.fileName?.split('/').pop())}
                          </span>
                          <span>.{fileNameExtension(file?.fileName?.split('/').pop())}</span>
                        </span>
                        <div className="d-flex">
                          <span
                            className="material-icons-round download-file"
                            title={`Download ${file?.fileName}`}
                            onClick={() => handleFileDownload(file?.fileName)}
                          >
                            cloud_download
                          </span>
                          <span
                            className="material-icons-round delete-file"
                            title={`Delete ${file?.fileName}`}
                            onClick={() => handleFileDeletion(index, file, detail)}
                          >
                            delete
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {detail?.isFileUploadAllowed && (
                <div className="standard-detail-button">
                  <FileUploadButton
                    formName="formA"
                    subFormName="standards"
                    data={detail}
                    index={index}
                    isEditable={isEditable}
                    isMulti
                    existFiles={detail?.filePath ?? []}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Standards;
