import axios from "axios";
import { MY_IP } from "../../secret.js"

/**
 * ACTION TYPES
 */
const GET_HOUSEHOLD_MEMBERS = "GET_HOUSEHOLD_MEMBERS"

/* INITIAL STATE */
const initialState = [];

/**
 * ACTION CREATORS
 *  
 */

const getHouseholdMembers = (householdMembers) => ({
    type: GET_HOUSEHOLD_MEMBERS,
    householdMembers,
})

/**
 * THUNK CREATORS
 */

//gets all household members
export const getAllHouseholdMembers = (listId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://peasy-server.herokuapp.com/api/households/${listId}/members`);
        dispatch(getHouseholdMembers(data));
    } catch (error) {
        console.log(error)
    }
}

/**
* REDUCER
*/

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HOUSEHOLD_MEMBERS:
            return action.householdMembers;
        default:
            return state;
    }
}