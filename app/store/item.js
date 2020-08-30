// import axios from 'axios'
// import {MY_IP} from '../../secret'


// /**
//  * ACTION TYPES
//  */
// const INCREASE_ITEM = "INCREASE_ITEM"
// const DECREASE_ITEM = "DECREASE_ITEM"
// /**
//  * INITIAL STATE
//  */
// const initialState = {}


// /**
//  * ACTION CREATORS
//  */
// const increaseItem = (item) => ({
//     type: INCREASE_ITEM,
//     item
// })
// const decreaseItem = (item) => ({
//   type: DECREASE_ITEM,
//   item
// })

// /**
//  * THUNK CREATORS
//  */
// export const increaseItemQuantity = (listId, itemId, quantity) => async dispatch => {
//   try {
//     quantity += 1
//     const {data} = await axios.put(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`, {quantity})
//     dispatch(increaseItem(data))
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const decreaseItemQuantity = (listId, itemId, quantity) => async dispatch => {
//   try {
//     quantity -= 1
//     const {data} = await axios.put(`http://${MY_IP}:19006/api/lists/${listId}/${itemId}`, {quantity})
//     dispatch(decreaseItem(data))
//   } catch (error) {
//     console.log(error)
//   }
// }


// /**
// * REDUCER
// */
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case INCREASE_ITEM:
//       return action.item
//     case DECREASE_ITEM:
//       return action.item
//     default:
//       return state
//   }
// }
