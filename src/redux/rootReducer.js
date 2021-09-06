import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { loginReducer } from '../Pages/Login/redux/LoginReducer';
import { facilityReducer } from '../Pages/Facility/redux/FacilityReducer';
import { generalLoaderReducer } from '../components/GeneralLoader/redux/GeneralLoaderReducer';
import { userReducer } from '../Pages/User/redux/UserReducer';
import { registrarReducer } from '../Pages/Registrar/redux/RegistrarReducer';
import { accreditedReducer } from '../Pages/Accredited/redux/AccreditedReducer';
import { dashboard } from '../Pages/Dashboard/redux/DashboardReducer';
import { addSupervisorReducer } from '../Pages/AddSupervisor/redux/AddSupervisorReducer';

export const appReducer = combineReducers({
  dashboard,
  loginReducer,
  facilityReducer,
  userReducer,
  generalLoaderReducer,
  registrarReducer,
  accreditedReducer,
  addSupervisorReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
