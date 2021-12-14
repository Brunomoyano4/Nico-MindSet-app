import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import psychologistsReducer from '../redux/psychologists/reducer';
import postulantsReducer from './postulants/reducer';
import clientsReducer from './clients/reducer';
import interviewsReducer from './interviews/reducer';

const rootReducer = combineReducers({
  clients: clientsReducer,
  postulants: postulantsReducer,
  psychologists: psychologistsReducer,
  interviews: interviewsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
