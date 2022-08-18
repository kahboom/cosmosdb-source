import {
  FormEvent,
  useState
} from "react";
import {
  IStepProps
} from "kaoto/dts/types";
import {
  Card,
  CardBody,
  Divider,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Page,
  PageSection,
  TextArea,
  TextInput
} from "@patternfly/react-core";

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
  console.log('text: ', text);
  const [description, setDescription] = useState('');
  const [option, setOption] = useState('choose a fruit');

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

  const handleNameChange = (name: string) => {
    setLocalStep({ ...localStep, name: name });
  };

  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const handleOptionChange = (value: string, _event: FormEvent<HTMLSelectElement>) => {
    setOption(value);
  };

  const options = [
    { value: 'select one', label: 'Select one', disabled: false },
    { value: 'cherry', label: 'Cherry', disabled: false },
    { value: 'blueberry', label: 'Blueberry', disabled: false },
    { value: 'lemon', label: 'Lemon', disabled: false },
    { value: 'peach', label: 'Peach', disabled: false },
    { value: 'apple', label: 'Apple', disabled: false },
    { value: 'other', label: 'Other', disabled: false }
  ];

  return (
    <Page>
      <PageSection isWidthLimited isCenterAligned>
        <Card>
          <CardBody>
            <button
              style={buttonStyling}
              onClick={syncAction}>
              Get Step from Kaoto
            </button>&nbsp;&nbsp;
            <button
              style={buttonStyling}
              onClick={notifyAction}>
              Notify Kaoto
            </button>
            <br/><br/>
            <p>Current Step: {localStep?.name}</p>
          </CardBody>
        </Card>
        <Divider/>
        <Card>
          <CardBody>
            <Form isHorizontal>
              <FormGroup
                label="Step name"
                isRequired
                fieldId="horizontal-form-name"
                helperText="This will be filled automatically if you synchronize steps"
              >
                <TextInput
                  value={localStep.name}
                  isRequired
                  type="text"
                  id="horizontal-form-name"
                  aria-describedby="horizontal-form-name-helper"
                  name="horizontal-form-name"
                  onChange={handleNameChange}
                />
              </FormGroup>
              <FormGroup label="Choose a fruit" fieldId="horizontal-form-fruit">
                <FormSelect
                  value={option}
                  onChange={handleOptionChange}
                  id="horizontal-form-fruit"
                  name="horizontal-form-fruit"
                  aria-label="Choose a fruit"
                >
                  {options.map((option, index) => (
                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup label="Your description" fieldId="horizontal-form-desc">
                <TextArea
                  value={description}
                  onChange={handleDescriptionChange}
                  id="horizontal-form-desc"
                  name="horizontal-form-desc"
                />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </PageSection>
    </Page>
  )
};

export default CosmosView;



