import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import rootReducer from "./reducer";

export const getInitalData = () => async dispatch => {
  try {
    let pathValue = window.location;
    let metadata = await axios.get(
      pathValue.origin + '/fakeData.json'
    )
    .then(res => {return res.data});
    
    // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
    dispatch({ type: 'DATA_INITIALIZED', metadata, isDataInitialized: true });
  } catch (error) {
    console.log(error);
  }
};

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;