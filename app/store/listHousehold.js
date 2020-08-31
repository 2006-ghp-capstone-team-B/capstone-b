import axios from "axios";
import { MY_IP } from "../../secret";
/**
 * ACTION TYPES
 */
const GET_HOUSE_LIST = "GET_HOUSE_LIST";
const INCREASE_ITEM = "INCREASE_ITEM";
const DECREASE_ITEM = "DECREASE_ITEM";

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

const getHouseList = (list) => ({
  type: GET_HOUSE_LIST,
  list,
});
const increaseItem = (list) => ({
  type: INCREASE_ITEM,
  list,
});
const decreaseItem = (list) => ({
  type: DECREASE_ITEM,
  list,
});

/**
 * THUNK CREATORS
 */
export const getListHousehold = (listId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`);
    dispatch(getHouseList(data));
  } catch (error) {
    console.log(error);
  }
};

export const increaseItemQuantity = (listId, itemId, quantity) => async (dispatch) => {
  try {
    quantity += 1;
    await axios.put(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`, { quantity }); //update the single item
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`); //fetch the updated list
    dispatch(increaseItem(data));
  } catch (error) {
    console.log(error);
  }
};

export const decreaseItemQuantity = (listId, itemId, quantity) => async (dispatch) => {
  try {
    quantity -= 1;
    await axios.put(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`, { quantity });
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`);
    dispatch(decreaseItem(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSE_LIST:
      return action.list;
    case INCREASE_ITEM:
      return action.list;
    case DECREASE_ITEM:
      return action.list;
    default:
      return state;
  }
}
