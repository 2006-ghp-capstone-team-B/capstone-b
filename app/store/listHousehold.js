import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_HOUSE_LIST = "GET_HOUSE_LIST";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const DELETE = "DELETE";
const ADD = "ADD";

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

const increaseItem = (updatedItem) => ({
  type: INCREASE,
  updatedItem,
});
const decreaseItem = (updatedItem) => ({
  type: DECREASE,
  updatedItem,
});
const deleteItem = (deletedItem) => ({
  type: DELETE,
  deletedItem,
});
const addItem = (list) => ({
  type: ADD,
  list,
});

/**
 * THUNK CREATORS
 */
export const getListHousehold = (listId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`);
    dispatch(getHouseList(data));
  } catch (error) {}
};

export const increaseItemQuantity = (itemId, listId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/items/add`, { itemId, listId, userId });
    dispatch(increaseItem(data));
  } catch (error) {}
};

export const decreaseItemQuantity = (listId, itemId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`https://peasy-server.herokuapp.com/api/items/reduce`, {
      itemId,
      listId,
      userId,
    });
    if (data === 0) {
      alert("Your personal count for this item is 0, you can't decrease any further!");
    } else {
      dispatch(decreaseItem(data));
    }
  } catch (error) {}
};

export const deleteSingleItem = (listId, itemId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`https://peasy-server.herokuapp.com/api/items/remove`, { itemId, listId });
    dispatch(deleteItem(data));
  } catch (error) {}
};

export const addNewItem = (item, listId, userId) => async (dispatch) => {
  try {
    const { itemName, quantity } = item;
    const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/items`, { itemName });
    const { id } = data;
    const newItem = { itemId: id, userId: userId, listId: listId, quantity: quantity };
    await axios.post(`https://peasy-server.herokuapp.com/api/lists/${listId}`, newItem);
    const res = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`);
    dispatch(addItem(res.data));
  } catch (error) {}
};

export const markPurchased = (itemId, listId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`https://peasy-server.herokuapp.com/api/lists/markPurchased`, { itemId, listId });
    dispatch(getHouseList(data));
  } catch (error) {}
};

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSE_LIST:
      return action.list;
    case INCREASE: {
      state.forEach((item) => {
        if (item.id === action.updatedItem.id) {
          item.quantity = item.quantity + 1;
        }
      });
      return state;
    }
    case DECREASE: {
      state.forEach((item) => {
        if (item.id === action.updatedItem.id) {
          item.quantity = item.quantity - 1;
        }
      });
      return state;
    }
    case DELETE: {
      const newState = state.filter((item) => item.id !== action.deletedItem.id);
      return newState;
    }
    case ADD:
      return action.list;
    default:
      return state;
  }
}
