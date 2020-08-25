import axios from "axios";
import { MY_IP } from "../../secret";
import { Actions } from "react-native-router-flux";

// when we login -> store user's entire obj
// AsyncStorage is global
// each page would fetch user's info based on asyncstorage info
// log out -> removeItem

/**
 * ACTION TYPES
 */
const CREATE_USER = "CREATE_USER";
const GET_SINGLE_USER = "GET_SINGLE_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */

const createUser = (user) => ({
  type: CREATE_USER,
  user,
});

const getUser = (user) => ({
  type: GET_SINGLE_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

/**
 * THUNK CREATORS
 */

//signup
 export const createNewUser = (newUser) => async dispatch => {
  let res
  try{
    res = await axios.post(`http://${MY_IP}:19006/api/users`, newUser)
  }catch(authError){
    return dispatch(createUser({error: authError}))
  }

  try{
    dispatch(createUser(res.data))
    Actions.main();
  }catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
};

export const login = (user) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`http://${MY_IP}:19006/auth/login`, user);
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    //history.push('/home') //do we have home route now?
    Actions.main(); // main screen
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case GET_SINGLE_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
