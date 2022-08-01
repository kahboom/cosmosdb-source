import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CosmosView} from './CosmosView';

export const App = () => {
  return (
    <div
      className='App'>
      <p>
        CosmosDB Source
      </p>
      <CosmosView />
    </div>
  );
}

export default App;
