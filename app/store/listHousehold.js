import axios from 'axios'
import { MY_IP } from '../../secret'
/**
 * ACTION TYPES
 */
const GET_HOUSE_LIST = 'GET_HOUSE_LIST'
const INCREASE_ITEM = "INCREASE_ITEM"
const DECREASE_ITEM = "DECREASE_ITEM"
const CREATE_HOUSEHOLD_LIST = "CREATE_HOUSEHOLD_LIST "
const DELETE_ITEM = "DELETE_ITEM"

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getHouseList = (list) => ({
  type: GET_HOUSE_LIST,
  list
})
const createHouseholdList = (list) => ({
  type: CREATE_HOUSEHOLD_LIST,
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
const deleteItem = (list) => ({
  type: DELETE_ITEM,
  list
})


/**
 * THUNK CREATORS
 */
export const getListHousehold = (listId) => async dispatch => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/household/${listId}`)
    dispatch(getHouseList(data))
  } catch (error) {
    console.log(error)
  }
}

// creates a new household list
export const createNewHouseholdList = (newHouseholdList) => async (dispatch) => {
  try {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!Inside of createNewHouseholdList redux store")
    console.log("this is list passed in thunk creator:", newHouseholdList)
    let {data} = await axios.post(`http://${MY_IP}:19006/api/lists`, newHouseholdList);
    dispatch(createHouseholdList(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseItemQuantity = (listId, itemId, quantity) => async dispatch => {
  try {
    quantity += 1
    await axios.put(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`, { quantity }) //update the single item
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/household/${listId}`) //fetch the updated list
    dispatch(increaseItem(data))
  } catch (error) {
    console.log(error)
  }
}

export const decreaseItemQuantity = (listId, itemId, quantity) => async dispatch => {
  try {
    quantity -= 1
    await axios.put(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`, { quantity })
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/household/${listId}`)
    dispatch(decreaseItem(data))
  } catch (error) {
    console.log(error)
  }
}


export const deleteSingleItem = (listId, itemId) => async dispatch => {
  try {
    await axios.delete(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`)
    const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/household/${listId}`)
    dispatch(deleteItem(data))
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
      return action.list
    case CREATE_HOUSEHOLD_LIST:
      return action.list
    case INCREASE_ITEM:
      return action.list
    case DECREASE_ITEM:
      return action.list
    case DELETE_ITEM:
      return action.list
    default:
      return state
  }
}
