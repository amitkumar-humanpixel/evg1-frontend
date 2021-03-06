import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import {
  addNewSupervisor,
  deleteSupervisorDetail,
  deleteSupervisorFromList,
  getSupervisorData,
  getSupervisorList,
} from '../../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import SupervisorDetails from './SupervisorDetails';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';
import AddSupervisor from '../../../AddSupervisor/AddSupervisor';
import PromptOnRouteChange from '../../../../components/PromptOnRouteChange';

const Supervisor = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();

  const [isEditable, setIsEditable] = useState(true);

  const [isAddNewSupervisorModal, setIsAddNewSupervisorModal] = useState(false);

  const { deleteSupervisorButtonLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const { facilityId } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedDetails ?? {});

  const { supervisorList, supervisors, supervisorsCopy } = useSelector(
    ({ accreditedReducer }) => accreditedReducer?.formA ?? {},
  );

  const toggleAddNewSupervisorModal = useCallback(() => {
    setIsAddNewSupervisorModal(!isAddNewSupervisorModal);
  }, [isAddNewSupervisorModal]);

  const finalSupervisorsList = useMemo(() => {
    const registrarsSelected = supervisors?.map(e => e?.userId?.value);
    return supervisorList?.filter(e => !registrarsSelected.includes(e?.userId));
  }, [supervisorList, supervisors]);

  const addSupervisor = useCallback(() => {
    if (isEditable) dispatch(addNewSupervisor());
  }, [isEditable]);

  const deleteSupervisor = useCallback(
    async (index, userId) => {
      if (isEditable && userId?.value) {
        try {
          await dispatch(deleteSupervisorDetail(id, userId?.value));
          dispatch(deleteSupervisorFromList(index));
        } catch (e) {
          /**/
        }
      } else if (isEditable) {
        dispatch(deleteSupervisorFromList(index));
      }
    },
    [isEditable, id],
  );

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  useEffect(() => {
    if (facilityId) dispatch(getSupervisorList(facilityId));
  }, [facilityId]);

  useEffect(() => {
    if (id) dispatch(getSupervisorData(id));
  }, [id]);

  return (
    <>
      <PromptOnRouteChange data={supervisors} dataCopy={supervisorsCopy} />

      <section>
        <div className="common-white-container" style={{ 'margin-bottom': '20px' }}>
          <p>
            Please supply information of each accredited supervisor in the practice. The first entry should be the
            Principal Educational Supervisor. Please note that where applicants work across multiple sites, the roster
            hours on the application should relate ONLY to the specific site on this application.
          </p>
          <p>
            Spaces are provided for two supervisor applicants, but additional supervisors who are reaccrediting can be
            added by clicking the Reaccredit Supervisor button on the bottom right. There is no capacity for accrediting
            new supervisors in this application, but practice managers can flag an expression of interest of this to EV
            by clicking &lsquo;Add New Supervisor&rsquo;.
          </p>
          <p>
            Submission of the Supervisor Summary will send individual declarations to each named supervisor requesting
            they fill in their section.
          </p>
        </div>
      </section>
      {supervisors?.length > 0 &&
        supervisors?.map((supervisor, index) => (
          <section className="common-white-container mb-10">
            <div className="section-inner-title-button-row">
              <div className="section-inner-title">{`Supervisor ${index + 1}`}</div>
              {supervisors?.length > 1 && (
                <Button
                  buttonType="danger"
                  className="icon-button"
                  onClick={() => deleteSupervisor(index, supervisor?.userId)}
                  isDisabled={deleteSupervisorButtonLoader || !isEditable}
                >
                  <span className="material-icons-round">delete</span>
                </Button>
              )}
            </div>
            <SupervisorDetails
              supervisorList={finalSupervisorsList}
              index={index}
              data={supervisor}
              fromModule="formA"
              isEditable={isEditable}
            />
          </section>
        ))}
      <div className="add-button-row">
        <Button buttonType="primary" onClick={toggleAddNewSupervisorModal} isDisabled={!isEditable}>
          Add New Supervisor
        </Button>
        <Button buttonType="primary" className="ml-5" onClick={addSupervisor} isDisabled={!isEditable}>
          Add Re-accredit Supervisor
        </Button>
      </div>
      {isAddNewSupervisorModal && (
        <AddSupervisor
          isAddNewSupervisorModal={isAddNewSupervisorModal}
          toggleAddNewSupervisorModal={toggleAddNewSupervisorModal}
        />
      )}
    </>
  );
};

export default Supervisor;
