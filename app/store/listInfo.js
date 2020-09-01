import axios from 'axios'
import {MY_IP} from '../../secret'

/**
 * ACTION TYPES
 */
const GET_LIST_INFO = "GET_LIST_INFO"

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getListInfo = list => ({
    type: GET_LIST_INFO,
    list
})

//to get the private list Id without fetching the whole list private array
export const fetchListInfo = (userId) => async dispatch => {
    try {
        const { data } = await axios.get(`http://${MY_IP}:19006/api/lists/privatelist/${userId}`)
        dispatch(getListInfo(data))
    } catch (error) {
        console.log(error)
    }
}


export default function (state = initialState, action) {
    switch (action.type) {
      case GET_LIST_INFO:
        return action.list
      default:
        return state
    }
  }