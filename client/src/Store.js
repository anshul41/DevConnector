import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialStage = {};

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialStage,
  composeWithDevTools(applyMiddleware(
    ...middlewares,
))
);

store.subscribe(()=>{
  console.log(store.getState());
})

export default store;
