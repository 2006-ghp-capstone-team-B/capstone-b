import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

const getNotifications = (notifications) => ({
  type: GET_NOTIFICATIONS,
  notifications,
});

/**
 * THUNK CREATORS
 */
export const fetchNotifications = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/notifications/${userId}`);
    dispatch(getNotifications(data));
  } catch (error) {
    console.log(error);
  }
};

export const newLocationMessage = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`https://peasy-server.herokuapp.com/api/notifications/locationError`, { userId });
    dispatch(getNotifications(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.notifications;
    default:
      return state;
  }
}
