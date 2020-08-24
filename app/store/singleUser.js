import axios from 'axios'

/**
 * ACTION TYPES
 */
const CREATE_USER = 'CREATE_USER'
const GET_SINGLE_USER = "GET_SINGLE_USER"
const REMOVE_USER = 'REMOVE_USER'

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

const getUser = user => ({
  type: GET_SINGLE_USER,
  user
})

const removeUser = () => ({
  type: REMOVE_USER
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


export const login = (credentials) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, credentials)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    //history.push('/home') //do we have home route now?
    history.push("/")
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

 /**
 * REDUCER
 */

export default function(state = initialState, action) {
    switch (action.type) {
      case CREATE_USER:
        return action.user
      case GET_USER:
        return action.user
      case REMOVE_USER:
        return defaultUser
      default:
        return state
    }
  }
