import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import users from "./users";
import singleUser from "./singleUser";
import listPrivate from "./listPrivate";
import storePrefs from "./storePrefs";
import households from "./households";
import listHousehold from "./listHousehold";
import notifications from "./notifications";
import item from "./item"

const reducer = combineReducers({ users, singleUser,listPrivate, storePrefs, households, listHousehold, notifications });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

export default store;
