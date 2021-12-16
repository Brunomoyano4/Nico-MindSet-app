import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import profilesReducer from '../redux/profiles/reducer';
import psychologistsReducer from '../redux/psychologists/reducer';
import postulantsReducer from './postulants/reducer';
import clientsReducer from './clients/reducer';
import positionsReducer from './positions/reducer';
import applicationReducer from './applications/reducer';

const rootReducer = combineReducers({
  //here the reducers
  profiles: profilesReducer,
  clients: clientsReducer,
  postulants: postulantsReducer,
  psychologists: psychologistsReducer,
  positions: positionsReducer,
  application: applicationReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
