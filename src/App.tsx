import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Example} from './Example';

export const App = () => {
  return (
    <div
      className='App'>
      <p>
        CosmosDB Source
      </p>
      <Example />
    </div>
  );
}

export default App;
