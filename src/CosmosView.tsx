import {
  ChangeEvent,
  useState
} from "react";
import {
  IStepProps
} from "kaoto/dts/types";

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

export const CosmosView = ({
                             notifyKaoto,
                             step,
                             text
                           }: ICosmosViewProps) => {
  const [localStep, setLocalStep] = useState({ name: 'Local' });
  const [description, setDescription] = useState('');
  console.log('text: ', text);

  const handleTyping = (val: ChangeEvent<HTMLInputElement>) => {
    setDescription(val.target.value);
  };

  const notifyAction = () => {
    if (notifyKaoto) {
      notifyKaoto('Hello!', 'This message is from a step extension!')
    }
  };

  const syncAction = () => {
    console.log('Synchronizing..');
    console.log('step: ', step);

    if (step) {
      setLocalStep(step);
    }
  };

  return (
    <>
      <h2>
        Step Extension
      </h2>
      <button
        style={buttonStyling}
        onClick={syncAction}>
        Synchronize Step
      </button>&nbsp;&nbsp;
      <button
        style={buttonStyling}
        onClick={notifyAction}>
        Notify Kaoto
      </button>
      <br/><br/>
      <p>
        <input
          onChange={handleTyping}
          name={'description'}
          placeholder={'Is it updated?'}
          // defaultValue={description}
        />
      </p>
      <p>Current
        Step: {localStep?.name}</p>
      <p>Description: {description}</p>
    </>
  )
};

export default CosmosView;



