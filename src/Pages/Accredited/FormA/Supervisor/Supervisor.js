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

const Supervisor = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();
  const [isEditable, setIsEditable] = useState(true);
  const [isAddNewSupervisorModal, setIsAddNewSupervisorModal] = useState(false);

  const { deleteSupervisorButtonLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});
  const { role } = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});

  const { facilityId } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedDetails ?? {});

  const { supervisorList, supervisors } = useSelector(({ accreditedReducer }) => accreditedReducer?.formA ?? {});

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
      <div className="add-button-row">
        {['Accreditation_Support_Coordinator', 'Super_Admin'].includes(role) && (
          <Button buttonType="primary" onClick={toggleAddNewSupervisorModal}>
            Accredit New Supervisor
          </Button>
        )}
        <Button buttonType="primary" className="ml-5" onClick={addSupervisor}>
          Re-accredit Supervisor
        </Button>
      </div>
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
                  isDisabled={deleteSupervisorButtonLoader}
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
