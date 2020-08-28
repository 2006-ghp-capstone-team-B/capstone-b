import axios from "axios";
import { MY_IP } from "../../secret";

const GET_STORE_PREFS = "GET_STORE_PREFS";
const ADD_STORE_PREF = 'ADD_STORE_PREF'

const initialState = [];

const getStorePrefs = (storePrefs) => ({
  type: GET_STORE_PREFS,
  storePrefs,
});

const addStorePref = (newPref) => ({
  type: ADD_STORE_PREF,
  newPref
})

// thunk creator
export const fetchStorePrefs = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/stores/${userId}`);
    dispatch(getStorePrefs(data));
  } catch (e) {
    console.log(e);
  }
};

export const createNewPref = (userId, newPref) => async (dispatch) => {
  try {
    console.log('thunkin')
    const { data } = await axios.post(`http://${MY_IP}:19006/api/stores/${userId}`, newPref);
    dispatch(addStorePref(data));
  } catch (e) {
    console.log(e);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORE_PREFS:
      return action.storePrefs;
    case ADD_STORE_PREF:
      return [...state, action.newPref]
    default:
      return state;
  }
}
