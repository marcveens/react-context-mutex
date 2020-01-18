import React from 'react';
import { Provider } from 'react-redux';
import { FetchComponent, FetchComponent1 } from './FetchComponent';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <FetchComponent />
        <FetchComponent1 />
      </div>
    </Provider>
  );
}

export default App;
