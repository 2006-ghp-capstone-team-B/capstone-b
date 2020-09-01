import axios from "axios";
import {MY_IP} from "../../secret.js"

/**
 * ACTION TYPES
 */
const GET_ALL_HOUSEHOLDS = "GET_ALL_HOUSEHOLDS";
const CREATE_HOUSEHOLD= "CREATE_HOUSEHOLD"

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

const createHousehold = (households) => ({
  type: CREATE_HOUSEHOLD,
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

// creates a new household list
export const createNewHousehold = (listName, userId) => async (dispatch) => {
  try {
    const {data} = await axios.post(`https://peasy-server.herokuapp.com/api/lists`, {listName});
    const listId = data.id
    const household = {listId: listId, userId: userId, confirmed: "TRUE", category: "household"}
    await axios.post(`https://peasy-server.herokuapp.com/api/households/:userId`, household)
    const res = await axios.get(`https://peasy-server.herokuapp.com/api/households/${userId}`)
    dispatch(createHousehold(res.data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOUSEHOLDS:
      return action.households;
    case CREATE_HOUSEHOLD:
      return action.households;
    default:
      return state;
  }
}
