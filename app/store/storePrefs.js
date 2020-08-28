import axios from "axios";
import { MY_IP } from "../../secret";

const GET_STORE_PREFS = "GET_STORE_PREFS";
<<<<<<< HEAD
const ADD_STORE_PREF = 'ADD_STORE_PREF'
=======
const DELETE_STORE_FROM_PREFS = "DELETE_STORE_FROM_PREFS";
>>>>>>> dc858b6e35bcd8de9d7d18526b1df43f94352d0c

const initialState = [];

const getStorePrefs = (storePrefs) => ({
  type: GET_STORE_PREFS,
  storePrefs,
});

<<<<<<< HEAD
const addStorePref = (newPref) => ({
  type: ADD_STORE_PREF,
  newPref
})
=======
const deleteStoreFromPrefs = (storePrefs) => ({
  type: DELETE_STORE_FROM_PREFS,
  storePrefs,
});
>>>>>>> dc858b6e35bcd8de9d7d18526b1df43f94352d0c

// thunk creator
export const fetchStorePrefs = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/stores/${userId}`);
    dispatch(getStorePrefs(data));
  } catch (e) {
    console.log(e);
  }
};

<<<<<<< HEAD
export const createNewPref = (userId, newPref) => async (dispatch) => {
  try {
    console.log('thunkin')
    const { data } = await axios.post(`http://${MY_IP}:19006/api/stores/${userId}`, newPref);
    dispatch(addStorePref(data));
=======
export const deleteStoreThunk = (userId, storeId) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://${MY_IP}:19006/api/stores/${userId}`, storeId);
    dispatch(DELETE_STORE_FROM_PREFS(res.data));
>>>>>>> dc858b6e35bcd8de9d7d18526b1df43f94352d0c
  } catch (e) {
    console.log(e);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORE_PREFS:
      return action.storePrefs;
<<<<<<< HEAD
    case ADD_STORE_PREF:
      return [...state, action.newPref]
=======
    case DELETE_STORE_FROM_PREFS:
      return action.storePrefs;
>>>>>>> dc858b6e35bcd8de9d7d18526b1df43f94352d0c
    default:
      return state;
  }
}
