import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_LIST = 'GET_LIST'
const INCREASE_ITEM = "INCREASE_ITEM"
const DECREASE_ITEM = "DECREASE_ITEM"
const DELETE_ITEM = "DELETE_ITEM"
const ADD_NEW_ITEM = "ADD_NEW_ITEM"

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

const getList = list => ({
  type: GET_LIST,
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

const deleteItem = (list) => ({
  type: DELETE_ITEM,
  list
})

const addItem = list => ({
  type: ADD_NEW_ITEM,
  list
})

/**
 * THUNK CREATORS
 */


export const getListPrivate = (userId) => async dispatch => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
    dispatch(getList(data));
  } catch (error) {
    console.log(error);
  }
};

export const increaseItemQuantity = (userId, listId, itemId, quantity) => async (dispatch) => {
  try {
    quantity += 1;
    await axios.put(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`, { quantity });
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
    console.log("this is data", data);
    dispatch(increaseItem(data));
  } catch (error) {
    console.log(error);
  }
};

export const decreaseItemQuantity = (userId, listId, itemId, quantity) => async (dispatch) => {
  try {
    quantity -= 1;
    await axios.put(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`, { quantity });
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
    console.log("this is data", data);
    dispatch(decreaseItem(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleItem = (userId, listId, itemId) => async (dispatch) => {
  try {
    await axios.delete(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`);
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
    dispatch(deleteItem(data));
  } catch (error) {
    console.log(error);
  }
};

export const addNewItem = (item, listId, userId) => async dispatch => {
  try {
      console.log("in thunk creator, this is listId and userId passed in", listId, userId)
      const {itemName, quantity} = item
      const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/items`, {itemName})
      const {id} = data
      const newItem = {itemId: id, userId: userId, listId: listId, quantity: quantity}
      await axios.post(`https://peasy-server.herokuapp.com/api/lists/${listId}`, newItem)
      const res = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`)
      dispatch(addItem(res.data))
  } catch (error) {
      console.log(error)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return action.list;
    case INCREASE_ITEM:
      return action.list;
    case DECREASE_ITEM:
      return action.list;
    case DELETE_ITEM:
      return action.list;
    case ADD_NEW_ITEM:
      return action.list
    default:
      return state;
  }
}
