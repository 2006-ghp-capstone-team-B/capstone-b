import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_HOUSE_LIST = 'GET_HOUSE_LIST'
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

// NEW INCREASE THUNK
// export const increaseItemQuantity = (itemId, listId, userId) => async (dispatch) => {
//   try {
//     await axios.post(`https://peasy-server.herokuapp.com/api/items/add`, { itemId, listId, userId });

//   } catch (error) {
//     console.log(error);
//   }
// };



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

export const deleteSingleItem = (listId, itemId) => async (dispatch) => {
  try {
    await axios.delete(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`);
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`);
    dispatch(deleteItem(data));
  } catch (error) {
    console.log(error);
  }
}

export const addNewItem = (item, listId, userId) => async dispatch => {
  try {
    const { itemName, quantity } = item
    const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/items`, { itemName })
    const { id } = data
    const newItem = { itemId: id, userId: userId, listId: listId, quantity: quantity }
    await axios.post(`https://peasy-server.herokuapp.com/api/lists/${listId}`, newItem)
    const res = await axios.get(`https://peasy-server.herokuapp.com/api/lists/household/${listId}`)
    dispatch(addItem(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const markPurchased = (itemId, listId) => async dispatch => {
  try {
    const {data} = await axios.put(`https://peasy-server.herokuapp.com/api/lists/markPurchased`, {itemId, listId})
    dispatch(getHouseList(data))
  } catch (error) {
    console.log(error)
  }
}

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
    case DELETE_ITEM:
      return action.list
    case ADD_NEW_ITEM:
      return action.list
    default:
      return state;
  }
}
