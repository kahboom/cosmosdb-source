import { useState } from "react";
import { IStepProps } from "kaoto/dts/types";

const buttonStyling = {
  backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px'
};

export interface ICosmosViewProps {
  getStep?: () => any;
  notifyKaoto?: (title: string, body?: string, variant?: any) => void;
  onButtonClicked?: () => void;
  step?: IStepProps;
  text?: string;
}

export const CosmosView = ({ notifyKaoto, step, text }: ICosmosViewProps) => {
  const [localStep, setLocalStep] = useState({ name: 'Local' });
  console.log('text: ', text);

  const syncAction = () => {
    console.log('Synchronizing..');
    console.log('step: ', step);

    if(notifyKaoto) {
      notifyKaoto('Hello!', 'This message is from a remote step extension!')
    }

    if(step) {
      setLocalStep(step);
    }
  };

  return (
    <>
      <h2>Step Extension</h2>
      <button
        style={buttonStyling}
        onClick={syncAction}>Synchronize Step
      </button>
      <p>Current Step: {localStep?.name}</p>
    </>
  )
};

export default CosmosView;



