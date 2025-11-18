import StepFourProvider from '../../../../../../context/register/registerTasker/StepFourProvider';
import StepOneProvider from '../../../../../../context/register/registerTasker/StepOneProvider';
import StepThreeProvider from '../../../../../../context/register/registerTasker/StepThreeProvider';
import StepTwoProvider from '../../../../../../context/register/registerTasker/StepTwoProvider';
import useValidateStep from '../../../../../../hooks/useValidateStep';
import FooterConditionsTerm from '../../FooterConditionsTerm';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

// COMPONENTE QUE CONTENE TODOS LOS PASOS DEL FORMULARIO DE REGISTRO PROFESIONAL
const AllStepsFormTasker = () => {
  // HOOK PAEA VALIDAR LOS PASOS Y RENDERIZAR
  const { isStepOne, isStepTwo, isBudge, isLastStepFieldSBasic, isLastStep} = useValidateStep();

  return (
    <>
      {isStepOne && (
        <StepOneProvider>
          <StepOne />
        </StepOneProvider>
      )}
      {isStepTwo && (
        <StepTwoProvider>
          <StepTwo />
        </StepTwoProvider>
      )}
      {isBudge && (
        <StepThreeProvider>
          <StepThree />
        </StepThreeProvider>
      )}
      {isLastStepFieldSBasic && (
        <StepFourProvider>
          <StepFour />
        </StepFourProvider>
      )}
      {isLastStep && <FooterConditionsTerm />}
    </>
  );
};

export default AllStepsFormTasker;
