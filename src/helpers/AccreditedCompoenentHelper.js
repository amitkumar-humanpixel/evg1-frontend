import Standards from '../Pages/Accredited/FormA/Standards/Standards';
import Supervisor from '../Pages/Accredited/FormA/Supervisor/Supervisor';
import PracticeManager from '../Pages/Accredited/FormA/PracticeManager/PracticeManager';
import FinalChecklist from '../Pages/Accredited/FormA1/FinalChecklist/FinalChecklist';
import Declaration from '../Pages/Accredited/FormB/Declaration/Declaration';
import Summary from '../Pages/Accredited/FormB/Summary/Summary';
import PostDetails from '../Pages/Accredited/PostDetails/PostDetails';
import Registrar from '../Pages/Accredited/FormA/Registrar/Registrar';
import A1Supervisor from '../Pages/Accredited/FormA1/A1Supervisor/A1Supervisor';
import AccreditorAssign from '../Pages/Accredited/FormB/AccreditorAssign/AccreditorAssign';

export const getSubStepComponent = (step, subStep) => {
  if (step === 'formA') {
    switch (subStep) {
      case 'standards':
        return <Standards />;
      case 'supervisor':
        return <Supervisor />;
      case 'registrar':
        return <Registrar />;
      default:
        return <PracticeManager />;
    }
  }
  if (step === 'formA1') {
    switch (subStep) {
      case 'finalCheckList':
        return <FinalChecklist />;
      default:
        return <A1Supervisor />;
    }
  }
  if (step === 'formB') {
    switch (subStep) {
      case 'declaration':
        return <Declaration />;
      case 'assignAccreditor':
        return <AccreditorAssign />;
      default:
        return <Summary />;
    }
  } else return <PostDetails />;
};

export const getStepComponent = (step, subStep) => {
  if (step !== 'postDetails') {
    return getSubStepComponent(step, subStep);
  }
  if (step === 'postDetails') {
    return <PostDetails />;
  }
  return false;
};
