import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import psychologistsReducer from '../redux/psychologists/reducer';
import thunk from 'redux-thunk';
import postulantsReducer from './postulants/reducer';

const rootReducer = combineReducers({
  postulants: postulantsReducer,
  psychologists: psychologistsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
