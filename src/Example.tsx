import { useState } from "react";
// import kaotoExtensionApi from 'kaoto/stepExtensionApi';
// import notifyKaoto from 'kaoto/stepExtensionApi';
import useIntegrationJsonStore from "kaoto/integrationJson";

const buttonStyling = {
  backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px'
};

export interface IProps {
  getStep?: () => any;
  notifyKaoto?: (title: string, body?: string, variant?: any) => void;
  onButtonClicked?: () => void;
}

export const Example = (props: IProps) => {
  const [localStep, setLocalStep] = useState({ name: 'Example' });
  const useStore = useIntegrationJsonStore();

  const someAction = () => {
    console.log('BANANAS123!');
    console.log('integration json steps: ', useStore.integrationJson.steps);
    // setLocalStep(useStore.integrationJson.steps[0].name);
    // notifyKaoto('Message from Remote Step Extension!', 'hi from step extension template!', 'success');

    // kaotoExtensionApi.getStep().then((newStep: any) => {
    //   console.log('newStep from within step extension template.. ' + newStep);
    //   setLocalStep(newStep);
    // });

    // kaotoExtensionApi.onButtonClicked();
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

