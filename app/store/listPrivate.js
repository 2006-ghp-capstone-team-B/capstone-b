import axios from 'axios'
import {MY_IP} from '../../secret'

/**
 * ACTION TYPES
 */
const GET_LIST = 'GET_LIST'
const DECREASE_QUANTITY = "DECREASE_QUANTITY"
const INCREASE_QUANTITY = "INCREASE_QUANTITY"

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

const increaseQuantity = quantity => ({
  type: 'INCREASE_QUANTITY',
  quantity
});

const decreaseQuantity = quantity => ({
  type: 'DECREASE_QUANTITY',
  quantity
});

/**
 * THUNK CREATORS
 */
export const getListPrivate = (userId) => async dispatch => {
  try {
    const { data } = await axios.get(`http://${MY_IP}:19006/api/users/${userId}/listPrivate/items`)
    dispatch(getList(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseItem = (userId, itemId) => async dispatch => {
  try{
    const res = await axios.get(`http://${MY_IP}:19006/api/users/${userId}/listPrivate/items`)
    const items = res.data
    if(items){
      for(let i=0; i< items.length; i++){
        if(items[i].item.id === itemId){
          console.log("items before increase", items[i])
          items[i].quantity += 1
          console.log("items after increase", items[i])
          const {data} = await axios.put(`http://${MY_IP}:19006/api/users/${userId}/listPrivate/items`, items[i])
          console.log("data", data)
          //dispatch(increaseQuantity(items[i].quantity))
        }
      }
    }
  }catch(error){
    console.log(error)
  }
}

// export const decreaseItem = (userId, itemId) => async dispatch => {

// }
/**
* REDUCER
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return action.list
    case INCREASE_QUANTITY:
      return {
        ...state,
        quantity: action.quantity
      };
    case DECREASE_QUANTITY:
        return {
          ...state,
          quantity: action.quantity
        };
    default:
      return state
  }
}