import {
  useState
} from "react";

const buttonStyling = {
  backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px'
};

export type IProps = {
  getStep?: () => any;
  notifyKaoto?: (title: string, body?: string, variant?: any) => void;
  onButtonClicked?: () => void;
}

const Example = (props: IProps) => {
  const [localStep, setLocalStep] = useState({ name: 'Example' });

  const someAction = () => {
    console.log('BANANAS123!');
    props.notifyKaoto('Message from Remote Step Extension!', 'hi from step extension template!', 'success');


    if (props.getStep) {
      props.getStep().then((newStep: any) => {
        console.log('newStep from within step extension template.. ' + newStep);
        setLocalStep(newStep);
      });
    }

    if(props.onButtonClicked) {
      props.onButtonClicked();
    }
  };

  return (
    <>
      <button
        className={'superTest'}
        style={buttonStyling}
        onClick={someAction}>Step
        Extension
      </button>
      <p>Local Step: {localStep?.name}</p>
    </>
  )
};

export default Example;

