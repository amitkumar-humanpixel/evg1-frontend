import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStoreData, store } from './redux/store';
import Routes from './routes/Routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStoreData}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
