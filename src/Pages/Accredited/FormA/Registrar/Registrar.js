import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import RegistrarDetails from './RegistrarDetails';
import {
  addNewRegistrar,
  deleteRegistrarFromList,
  getRegistrarData,
  getRegistrarsList,
} from '../../redux/AccreditedReduxActions';
import { useQueryParams } from '../../../../hooks/GetQueryParamHook';
import { AccreditedEditableHelper } from '../../../../helpers/AccreditedEditableHelper';

const Registrar = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();
  const { step, subStep } = useParams();

  const { accreditionSideBar } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedStepper ?? {});

  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    setIsEditable(AccreditedEditableHelper(accreditionSideBar, step, subStep));
  }, [step, subStep, accreditionSideBar]);

  const { facilityId } = useSelector(({ accreditedReducer }) => accreditedReducer?.accreditedDetails ?? {});
  const { registrarList, registrars } = useSelector(({ accreditedReducer }) => accreditedReducer?.formA ?? {});

  const finalRegistrarList = useMemo(() => {
    const registrarsSelected = registrars?.map(e => e?.placementId?.value);
    return registrarList?.filter(e => !registrarsSelected.includes(e?.value));
  }, [registrarList, registrars]);

  useEffect(() => {
    if (facilityId) dispatch(getRegistrarsList(facilityId));
  }, [facilityId]);

  useEffect(() => {
    if (id) dispatch(getRegistrarData(id));
  }, [id]);

  const addRegistrar = useCallback(() => {
    if (isEditable) dispatch(addNewRegistrar());
  }, [isEditable]);

  const deleteRegistrar = useCallback(
    index => {
      if (isEditable) dispatch(deleteRegistrarFromList(index));
    },
    [isEditable],
  );

  return (
    <>
      <div className="add-button-row">
        <Button buttonType="primary" className="icon-button" onClick={addRegistrar}>
          <span className="material-icons-round">add</span>
        </Button>
      </div>
      {registrars?.length > 0 &&
        registrars.map((registrar, index) => (
          <section className="common-white-container mb-10">
            <div className="section-inner-title-button-row">
              <div className="section-inner-title">{`Registrar ${index + 1}`}</div>
              <Button buttonType="danger" className="icon-button" onClick={() => deleteRegistrar(index)}>
                <span className="material-icons-round">delete</span>
              </Button>
            </div>
            <RegistrarDetails
              registrarList={finalRegistrarList}
              index={index}
              data={registrar}
              isEditable={isEditable}
            />
          </section>
        ))}
    </>
  );
};

export default Registrar;
