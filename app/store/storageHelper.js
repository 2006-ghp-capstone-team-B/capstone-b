// this file is where asyncStorage funcs live

import AsyncStorage from "@react-native-community/async-storage";
import { login } from "./singleUser";
const STORAGE_KEY = "@save_user";

export const saveUser = async (user) => {
  try {
    console.log('inside asyncStore')
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    console.log('saved to asyncStore')
  } catch (e) {
    alert("failed to save user!");
  }
};

export const readUser = async () => {
  try {
    const user = await AsyncStorage.getItem(STORAGE_KEY);
    return user
  } catch (e) {
    alert("failed to read user!");
  }
};


export const logUserOut = async () => {
  try{
    await AsyncStorage.clear();
    alert("user cleared in async storage")
  }catch(e){
    alert("failed to log user out!")
  }
}
