import axios from 'axios'

/**
 * ACTION TYPES
 */
const CREATE_USER = 'CREATE_USER'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */

const createUser = user => ({
  type: CREATE_USER,
  user
})

/**
 * THUNK CREATORS
 */
 export const createNewUser = (newUser) => async dispatch => {
  try{
    console.log('inside thunk', newUser)
    const {data} = await axios.post('/api/users', newUser)
    console.log('data from axios req', data)
    dispatch(createUser(data))
  }catch(error){
      console.log(error)
  }
}

 /**
 * REDUCER
 */

export default function(state = initialState, action) {
    switch (action.type) {
      case CREATE_USER:
        return action.user
      default:
        return state
    }
  }
