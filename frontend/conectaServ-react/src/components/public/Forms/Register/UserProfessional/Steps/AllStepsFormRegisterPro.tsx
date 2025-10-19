import StepFourProvider from '../../../../../../context/register/registerPro/StepFourProvider';
import StepOneProvider from '../../../../../../context/register/registerPro/StepOneProvider';
import StepThreeProvider from '../../../../../../context/register/registerPro/StepThreeProvider';
import StepTwoProvider from '../../../../../../context/register/registerPro/StepTwoProvider';
import useRegisterPro from '../../../../../../hooks/useRegisterPro';
import FooterConditionsTerm from '../../FooterConditionsTerm';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

// COMPONENTE QUE CONTENE TODOS LOS PASOS DEL FORMULARIO DE REGISTRO PROFESIONAL
const AllStepsFormsRegisterPro = () => {
  const { step, hasBudge } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL

  // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isLastStep: boolean = (step === 3 && !hasBudge) || (hasBudge && step === 4); //EL ULTIMO PASO;
  const isBudge: boolean = step === 3 && hasBudge;
  return (
    <>
      {step === 1 && (
        <StepOneProvider>
          <StepOne />
        </StepOneProvider>
      )}
      {step === 2 && (
        <StepTwoProvider>
          <StepTwo />
        </StepTwoProvider>
      )}
      {isBudge && (
        <StepThreeProvider>
          <StepThree />
        </StepThreeProvider>
      )}
      {isLastStep && (
        <StepFourProvider>
          <StepFour />
        </StepFourProvider>
      )}
      {isLastStep && <FooterConditionsTerm />}
    </>
  );
};

export default AllStepsFormsRegisterPro;
