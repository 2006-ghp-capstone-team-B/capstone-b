import axios from "axios";

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

const getHouse = (house) => {
  console.log('inside action creator')
  return {
  type: SEARCH_HOUSEHOLDS,
  house,
}};



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
    dispatch(getHouse(data));
    return data;
  } catch (error) {
    if(error.response) {
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
    } else if (error.request) {
      console.log('2');
    } else {
      console.log('3');
      console.log('err', error)
    }

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
