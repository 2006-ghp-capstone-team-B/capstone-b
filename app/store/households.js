import axios from 'axios'
import {MY_IP} from '../../secret'
/**
 * ACTION TYPES
 */
const GET_ALL_HOUSEHOLDS = 'GET_ALL_HOUSEHOLDS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getHouseholds = households => ({
  type: GET_ALL_HOUSEHOLDS,
  households
})

/**
 * THUNK CREATORS
 */
export const getAllHouseholds = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`http://${MY_IP}:19006/api/households/${userId}`)
    dispatch(getHouseholds(data))
  } catch (error) {
    console.log(error)
  }
}

/**
* REDUCER
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOUSEHOLDS:
      return action.households
    default:
      return state
  }
}
