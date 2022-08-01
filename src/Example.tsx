import { useState } from "react";
// import kaotoExtensionApi from 'kaoto/stepExtensionApi';
// import notifyKaoto from 'kaoto/stepExtensionApi';
import {
  getKaotoCatalogSteps
} from "kaoto/dts/src/components";
import stepExtension from 'kaoto/stepExtensionApi';
import useIntegrationJsonStore from "kaoto/integrationJson";
import getKaotoIntegrationJson from "kaoto/stepExtensionApi";

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

export const Example = ({ notifyKaoto, step, text }) => {
  const [localSteps, setLocalSteps] = useState([]);
  const { integrationJson } = useIntegrationJsonStore();
  console.log('text: ', text);

  const someAction = () => {
    console.log('BANANAS123!');
    console.log('integration json steps: ', integrationJson.steps);
    console.log('step: ', step);
    if(integrationJson.steps) {
      setLocalSteps(integrationJson.steps);
    }

    // const someStep = stepExtension.getStep();
    // console.log('someStep: ', someStep);
    //
    // const integration = getKaotoIntegrationJson();
    // console.log('integration: ', integration);

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
      <p>Step Length: {localSteps?.length}</p>
    </>
  )
};



