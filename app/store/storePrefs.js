import axios from "axios";
import { MY_IP } from "../../secret";

const GET_STORE_PREFS = "GET_STORE_PREFS";
const DELETE_STORE_FROM_PREFS = "DELETE_STORE_FROM_PREFS";

const initialState = [];

const getStorePrefs = (storePrefs) => ({
  type: GET_STORE_PREFS,
  storePrefs,
});

const deleteStoreFromPrefs = (storePrefs) => ({
  type: DELETE_STORE_FROM_PREFS,
  storePrefs,
});

// thunk creator
export const fetchStorePrefs = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/stores/${userId}`);
    dispatch(getStorePrefs(data));
  } catch (e) {
    console.log(e);
  }
};

export const deleteStoreThunk = (userId, storeId) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://${MY_IP}:19006/api/stores/${userId}`, storeId);
    dispatch(DELETE_STORE_FROM_PREFS(res.data));
  } catch (e) {
    console.log(e);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORE_PREFS:
      return action.storePrefs;
    case DELETE_STORE_FROM_PREFS:
      return action.storePrefs;
    default:
      return state;
  }
}
