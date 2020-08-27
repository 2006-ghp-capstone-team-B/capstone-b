import axios from "axios";
import { MY_IP } from "../../secret";

const GET_STORE_PREFS = "GET_STORE_PREFS";

const initialState = [];

const getStorePrefs = (storePrefs) => ({
  type: GET_STORE_PREFS,
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

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORE_PREFS:
      return action.storePrefs;
    default:
      return state;
  }
}
