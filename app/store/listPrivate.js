import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LIST = 'CREATE_LIST'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getList = list => ({
  type: CREATE_LIST,
  list
})


/**
 * THUNK CREATORS
 */
export const createListPrivate = (list) => async dispatch => {
    try{
      const {data} = await axios.get('/api/lists/:userId')
      console.log('data from axios req', data)
      dispatch(createUser(data))
    }catch(error){
        console.log(error)
    }
  }