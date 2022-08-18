import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@patternfly/patternfly/patternfly-theme-dark.css';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/react-core/dist/styles/base.css';
import { CosmosView } from './CosmosView';

export const App = () => {
  return (
    <div
      className='App'>
      <p>
        CosmosDB Source
      </p>
      <CosmosView/>
    </div>
  );
}

export default App;
