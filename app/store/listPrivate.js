import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LIST = 'GET_LIST'

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

/**
 * THUNK CREATORS
 */
export const getListPrivate = (userId) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/listPrivate/items`)
    dispatch(getList(data))
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
    default:
      return state
  }
}