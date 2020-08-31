import axios from "axios";
import { MY_IP } from "../../secret";

const GET_STORE_PREFS = "GET_STORE_PREFS";
const ADD_STORE_PREF = "ADD_STORE_PREF";
const DELETE_STORE_FROM_PREFS = "DELETE_STORE_FROM_PREFS";

const initialState = [];

const getStorePrefs = (storePrefs) => ({
  type: GET_STORE_PREFS,
  storePrefs,
});

const addStorePref = (newPref) => ({
  type: ADD_STORE_PREF,
  newPref,
});
const deleteStoreFromPrefs = (updatedStorePref) => ({
  type: DELETE_STORE_FROM_PREFS,
  updatedStorePref,
});

// thunk creator
export const fetchStorePrefs = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/stores/${userId}`);
    dispatch(getStorePrefs(data));
  } catch (e) {
    console.log(e);
  }
};

export const createNewPref = (userId, newPref) => async (dispatch) => {
  try {
    console.log("inside createNewPref ");
    const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/stores/${userId}`, newPref);
    console.log("after createNewPRef post route");
    dispatch(addStorePref(data));
  } catch (e) {
    console.log(e);
  }
};

export const deleteStoreThunk = (userId, storeId) => async (dispatch) => {
  try {
    const res = await axios.delete(`https://peasy-server.herokuapp.com/api/stores/${userId}/${storeId}`);
    dispatch(deleteStoreFromPrefs(res.data));
  } catch (e) {
    console.log(e);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORE_PREFS:
      return action.storePrefs;
    case ADD_STORE_PREF:
      return [...state, action.newPref];
    case DELETE_STORE_FROM_PREFS:
      return action.updatedStorePref;
    default:
      return state;
  }
}
