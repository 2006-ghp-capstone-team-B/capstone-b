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

const increaseItem = (updatedItem) => ({
  type: INCREASE_ITEM,
  updatedItem,
});
const decreaseItem = (updatedItem) => ({
  type: DECREASE_ITEM,
  updatedItem,
});
const deleteItem = (deletedItem) => ({
  type: DELETE_ITEM,
  deletedItem
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

export const increaseItemQuantity = (itemId, listId, userId) => async (dispatch) => {
  try {
    console.log('new:', itemId, listId, userId)
    const {data} = await axios.post(`https://peasy-server.herokuapp.com/api/items/add`, { itemId, listId, userId });
    console.log('data', data)
    dispatch(increaseItem(data))
  } catch (error) {
    console.log(error);
  }
};

export const decreaseItemQuantity = (itemId, listId, userId) => async (dispatch) => {
  try {
    const {data} = await axios.post(`https://peasy-server.herokuapp.com/api/items/reduce`, { itemId, listId, userId });
    dispatch(decreaseItem(data))
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleItem = (listId, itemId) => async (dispatch) => {
  try {
    await axios.delete(`https://peasy-server.herokuapp.com/api/items/delete`, { itemId, listId, userId });
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

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSE_LIST:
      return action.list;
    case INCREASE_ITEM: {
      state.forEach(item => {
        if (item.id === action.updatedItem.id) {
          item.quantity = item.quantity + 1
        }
      })
      return state;
    }
    case DECREASE_ITEM: {
      state.forEach(item => {
        if (item.id === action.updatedItem.id) {
          item.quantity = item.quantity - 1
        }
      })
      return state;
    }
    case DELETE_ITEM: {
      const newState = state.filter(
        item => (item.id !== action.deletedItem.id)
      )
      return newState
    }
    case ADD_NEW_ITEM:
      return action.list
    default:
      return state;
  }
}
