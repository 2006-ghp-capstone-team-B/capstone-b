import axios from "axios";
import { MY_IP } from "../../secret.js"
/**
 * ACTION TYPES
 */
const GET_ALL_HOUSEHOLDS = "GET_ALL_HOUSEHOLDS";
const CREATE_HOUSEHOLD = "CREATE_HOUSEHOLD";
const SEARCH_HOUSEHOLDS = "SEARCH_HOUSEHOLDS";
const GET_HOUSEHOLD_MEMBERS = "GET_HOUSEHOLD_MEMBERS"
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

const getHouseholdMembers = (households) => ({
  type: GET_HOUSEHOLD_MEMBERS,
  households,
})

/**
 * THUNK CREATORS
 */
export const getAllHouseholds = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/households/${userId}`);
    dispatch(getHouseholds(data));
  } catch (error) {
    console.log(error);
  }
};

// creates a new household list
export const createNewHousehold = (listName, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`http://${MY_IP}:19006/api/lists`, { listName });
    const listId = data.id;
    const household = { listId: listId, userId: userId, confirmed: "TRUE", category: "household" };
    await axios.post(`http://${MY_IP}:19006/api/households/${userId}`, household);
    const res = await axios.get(`http://${MY_IP}:19006/api/households/${userId}`);
    dispatch(createHousehold(res.data));
  } catch (error) {
    console.log(error);
  }
};

//gets all household members
export const getAllHouseholdMembers = (listId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/${listId}/members`);
    const members = data.firstName;
    res.json(members);
  } catch (error) {
    console.log(error)
  }
}

export const findHousehold = (listId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/${listId}`);
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const addMember = (listId, user) => async (dispatch) => {
  console.log("inside add member thunk");
  try {
    const { id, firstName, lastName } = user;
    await axios.post(`http://${MY_IP}:19006/api/lists/join`, { listId, id, firstName, lastName });
  } catch (error) {
    console.log("err", error);
    console.log("res errrrrrrr", error.response);
    console.log("req errrrrrrr", error.request);
  }
};

export const acceptMember = (userId, listId) => async (dispatch) => {
  try {
    await axios.post(`http://${MY_IP}:19006/api/lists/accept`, { userId, listId });
  } catch (e) {
    console.log("ressssssss e", e.response);
    console.log("reqqqqqqqqe ", e.request);
    console.log(e);
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
