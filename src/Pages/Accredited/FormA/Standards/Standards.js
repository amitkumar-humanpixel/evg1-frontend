import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import {
  deleteFileFromStandards,
  getFormAStandardDetails,
  updateAccreditedSubFormArrayFields,
} from '../../redux/AccreditedReduxActions';
import FileUploadButton from '../../../../components/FileUploadButton';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import TriStateSwitch from '../../../../components/TriStateSwitch/TriStateSwitch';
import { fileNameExtension, fileNamePrefix } from '../../../../helpers/fileNameSplit';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

const attachments = [
  'Orientation is provided to each registrar at commencement - please attach the registrar specific orientation checklist/materials used by the practice.',
  'Practice is accredited by AGPAL or QPA (not mandatory for ACRRM) – please attach certificate',
  'Registrars continue to be employed to the current National Terms and Conditions for Employment of Registrars – please attach employment contract template',
];

const Standards = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const standards = useSelector(({ accreditedReducer }) => accreditedReducer?.formA?.standards ?? {});

  const handleInputChange = useCallback((index, name, value) => {
    dispatch(updateAccreditedSubFormArrayFields('formA', 'standards', index, name, value));
  }, []);

  const handleFileDeletion = useCallback(
    (index, filePath) => {
      dispatch(deleteFileFromStandards(index, `Files/${filePath?.split('/').pop()}`, id, 'practiceStandards'));
    },
    [id],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (id) dispatch(getFormAStandardDetails(id));
  }, [id]);

  return (
    <section>
      <div className="accredited-title mb-10">Standard Details</div>
      <div className="common-white-container">
        <div className="standard-texts">
          Supervisors and practice managers are referred to the most recent EV Training Post Handbook for guidance on
          current standards for teaching and supervision plus administrative requirements. If not already received The
          Training post handbook is available in electronic form from the Accreditation Support Administrator at EVGPT.
          Handbooks and Quick Guides are also available from the EV website at{' '}
          <a href="https://www.evgptraining.com.au/resources/" target="_blank" rel="noreferrer">
            https://www.evgptraining.com.au/resources/
          </a>
          .
        </div>
        <table className="standard-detail-table">
          {standards.map((detail, index) => (
            <tr>
              <td className="standard-detail-checkbox">
                <div className="standard-detail-with-attach-button">
                  <div className="standard-detail">
                    <TriStateSwitch
                      onChange={state => handleInputChange(index, 'status', state)}
                      state={detail?.status}
                    />
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
                      <div className="form-error-message standard-error-message">{detail?.error}</div>
                      {detail?.filePath && (
                        <div className="standard-attached-file">
                          <span className="file-name">
                            <span className="file-name-without-extension">
                              <b>Uploaded File: </b>
                              {fileNamePrefix(detail?.filePath?.split('/').pop())}
                            </span>
                            <span>.{fileNameExtension(detail?.filePath?.split('/').pop())}</span>
                          </span>
                          <span
                            className="material-icons-round"
                            onClick={() => handleFileDeletion(index, detail?.filePath)}
                          >
                            delete
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {useWindowWidth() < 1024 && attachments.includes(detail.title) && (
                    <FileUploadButton
                      formName="formA"
                      subFormName="standards"
                      data={detail}
                      index={index}
                      isEditable={isEditable}
                    />
                  )}

                  {detail?.title ===
                    'Have there been changes to facilities or resources since last\n' +
                      'accreditation/reaccreditation visit? If yes, please provide detail.' &&
                    detail?.status === 'true' && (
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
                </div>
              </td>

              {attachments.includes(detail.title) && (
                <td className="standard-detail-button">
                  <FileUploadButton
                    formName="formA"
                    subFormName="standards"
                    data={detail}
                    index={index}
                    isEditable={isEditable}
                  />
                </td>
              )}
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
};

export default Standards;
