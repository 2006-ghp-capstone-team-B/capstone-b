import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_LIST = "GET_LIST";
const INCREASE_ITEM = "INCREASE_ITEM";
const DECREASE_ITEM = "DECREASE_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const ADD_NEW_ITEM = "ADD_NEW_ITEM";

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

const getList = (list) => ({
  type: GET_LIST,
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
  deletedItem,
});

const addItem = (updatedList) => ({
  type: ADD_NEW_ITEM,
  updatedList,
});

/**
 * THUNK CREATORS
 */

export const getListPrivate = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
    dispatch(getList(data));
  } catch (error) {
    console.log(error);
  }
};

export const increaseItemQuantity = (itemId, listId, userId) => async (dispatch) => {
  try {
    console.log('++', itemId)
        console.log('--', userId)
        console.log('**', listId)
    const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/items/add`, { itemId, listId, userId});
    console.log('inc data', data)
    dispatch(increaseItem(data));
  } catch (error) {
    console.log('res', error.response)
    console.log('res', error.request)
  }
};

// export const increaseItemQuantity = (userId, listId, itemId, quantity) => async (dispatch) => {
//   try {
//     quantity += 1;
//     await axios.put(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`, { quantity });
//     const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
//     dispatch(increaseItem(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const decreaseItemQuantity = (itemId, listId, userId) => async (dispatch) => {
  try {
    console.log('--', itemId, listId, userId)
    const { data } = await axios.put(`https://peasy-server.herokuapp.com/api/items/reduce`, {
      itemId,
      listId,
      userId,
    });
    console.log('dec data', data)
    dispatch(decreaseItem(data));
  } catch (error) {
    console.log(error)
  }
};

// export const decreaseItemQuantity = (userId, listId, itemId, quantity) => async (dispatch) => {
//   try {
//     quantity -= 1;
//     await axios.put(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`, { quantity });
//     const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
//     dispatch(decreaseItem(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deleteSingleItem = (listId, itemId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`https://peasy-server.herokuapp.com/api/items/remove`, { itemId, listId });
    dispatch(deleteItem(data));
  } catch (error) {
    console.log(error)
  }
};

// export const deleteSingleItem = (userId, listId, itemId) => async (dispatch) => {
//   try {
//     await axios.delete(`https://peasy-server.herokuapp.com/api/lists/${listId}/${itemId}`);
//     const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/lists/private/${userId}`);
//     dispatch(deleteItem(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addNewItem = (item, listId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post("https://peasy-server.herokuapp.com/api/items/createNewItem", {
      item,
      listId,
      userId,
    });
    dispatch(addItem(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return action.list;
    case INCREASE_ITEM: {
      state.forEach((item) => {
        if (item.id === action.updatedItem.id) {
          item.quantity = item.quantity + 1;
        }
      });
      return state;
    }
    case DECREASE_ITEM: {
      state.forEach((item) => {
        if (item.id === action.updatedItem.id) {
          item.quantity = item.quantity - 1;
        }
      });
      return state;
    }

    case DELETE_ITEM: {
      const newState = state.filter((item) => item.id !== action.deletedItem.id);
      return newState;
    }
    case ADD_NEW_ITEM:
      return action.updatedList;
    default:
      return state;
  }
}
