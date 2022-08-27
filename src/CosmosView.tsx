import { useRef, useState } from 'react';
import { IStepExtensionApi } from '@kaoto';

import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  Divider,
  Form,
  FormGroup,
  Page,
  PageSection,
  TextInput,
} from '@patternfly/react-core';

const buttonStyling = {
  backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px',
};

/**
 * Extending the Kaoto Step Extension API is the easiest
 * way to get proper typings
 */
export interface ICosmosViewProps extends IStepExtensionApi {
  text?: string;
}

export const CosmosView = ({
  notifyKaoto,
  step,
  stepParams,
  text,
  updateStepParams,
}: ICosmosViewProps) => {
  /**
   * React forms MUST be *EITHER* uncontrolled (i.e. using a Ref), or
   * you must specify the initial values of the Step property (i.e. they can't go
   * from being undefined to defined), otherwise React will complain
   */
  const databaseNameRef = useRef(null);
  const [localParams, setLocalParams] = useState<{ [p: string]: any }>({
    ...stepParams,
  });

  const notifyAction = () => {
    if (notifyKaoto) notifyKaoto('Hello!', 'This message is from a step extension!');
  };

  const handleParamChange = (val: any, e: any) => {
    const fieldName = e.target.name;
    setLocalParams({ ...localParams, [fieldName]: val });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (updateStepParams) updateStepParams(localParams);
  };

  return (
    <Page>
      <PageSection isWidthLimited isCenterAligned>
        <Card>
          <CardBody>
            <button style={buttonStyling} onClick={notifyAction}>
              Notify Kaoto
            </button>
          </CardBody>
        </Card>
        <Divider />
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit} isHorizontal>
              <FormGroup label="Step name" fieldId="stepName">
                <TextInput
                  defaultValue={step?.name}
                  readOnly={true}
                  type="text"
                  id="stepName"
                  aria-describedby="stepNameHelper"
                  name="stepName"
                />
              </FormGroup>
              <FormGroup label="Database Name" fieldId="databaseName">
                <TextInput
                  defaultValue={localParams?.databaseName}
                  ref={databaseNameRef}
                  onChange={handleParamChange}
                  type="text"
                  id="databaseName"
                  aria-describedby="databaseName"
                  name="databaseName"
                />
              </FormGroup>
              <ActionGroup>
                <Button variant="primary" type={'submit'} onClick={handleSubmit}>
                  Submit
                </Button>
                <Button variant="link" type={'reset'}>
                  Cancel
                </Button>
              </ActionGroup>
            </Form>
          </CardBody>
        </Card>
      </PageSection>
    </Page>
  );
};

export default CosmosView;
