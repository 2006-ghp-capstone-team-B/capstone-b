import axios from "axios";
import {MY_IP} from '../../secret'

/**
 * ACTION TYPES
 */
const GET_ALL_HOUSEHOLDS = "GET_ALL_HOUSEHOLDS";
const SEARCH_HOUSEHOLDS = "SEARCH_HOUSEHOLDS"
/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

const getHouseholds = (households) => ({
  type: GET_ALL_HOUSEHOLDS,
  households,
});


/**
 * THUNK CREATORS
 */
export const getAllHouseholds = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/households/${userId}`);
    dispatch(getHouseholds(data));
  } catch (error) {
    console.log(error);
  }
};

export const findHousehold = (listId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/${listId}`);
    return data;
  } catch (error) {
      console.log('err', error)
  }
};

export const addMember = (listId, user) => async (dispatch) => {
  try {
    const {id, firstName, lastName} = user
    await axios.post(`https://peasy-server.herokuapp.com/api/lists/join`, {listId, id, firstName, lastName});
  } catch (error) {
      console.log('err', error)
  }
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOUSEHOLDS:
      return action.households;
    default:
      return state;
  }
}
