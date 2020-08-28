import axios from 'axios'
import {MY_IP} from '../../secret'
/**
 * ACTION TYPES
 */
const GET_HOUSE_LIST = 'GET_HOUSE_LIST'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getHouseList = list => ({
  type: GET_HOUSE_LIST,
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

/**
* REDUCER
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSE_LIST:
      return action.list
    default:
      return state
  }
}
