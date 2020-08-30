import axios from 'axios'
import {MY_IP} from '../../secret'

/**
 * ACTION TYPES
 */
const GET_LIST = 'GET_LIST'
const INCREASE_ITEM = "INCREASE_ITEM"
const DECREASE_ITEM = "DECREASE_ITEM"

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getList = list => ({
  type: GET_LIST,
  list
})

const increaseItem = (list) => ({
  type: INCREASE_ITEM,
  list
})

const decreaseItem = (list) => ({
  type: DECREASE_ITEM,
  list
})

/**
 * THUNK CREATORS
 */
export const getListPrivate = (userId) => async dispatch => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/private/${userId}`)
    dispatch(getList(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseItemQuantity = (userId, listId, itemId, quantity) => async dispatch => {
  try {
    quantity += 1
    await axios.put(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`, {quantity})
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/private/${userId}`)
    console.log("this is data", data)
    dispatch(increaseItem(data))
  } catch (error) {
    console.log(error)
  }
}

export const decreaseItemQuantity = (userId, listId, itemId, quantity) => async dispatch => {
  try {
    quantity -= 1
    await axios.put(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`, {quantity})
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/private/${userId}`)
    console.log("this is data", data)
    dispatch(decreaseItem(data))
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
      return action.list
    case INCREASE_ITEM:
      return action.list
    case DECREASE_ITEM:
      return action.list
    default:
      return state
  }
}
