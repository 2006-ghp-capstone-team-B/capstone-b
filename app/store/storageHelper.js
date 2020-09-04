// this file is where asyncStorage funcs live

import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "@save_user";

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem("@save_user", JSON.stringify(user));
  } catch (e) {
    alert("failed to save user!");
  }
};

export const readUser = async () => {
  try {
    const user = await AsyncStorage.getItem("@save_user");

    return user;
  } catch (e) {
    alert("failed to read user!");
  }
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.clear();
    alert("user cleared in async storage");
  } catch (e) {
    alert("failed to log user out!");
  }
};


export const saveLocPermission = async (permission) => {
  try {
    await AsyncStorage.setItem("@save_locPermission", JSON.stringify(permission))
  } catch (error) {
    alert('couldnt save permission')
  }
}

export const retrieveLocPermission = async () => {
  try {
    const permission =await AsyncStorage.getItem("@save_locPermission")
    return permission
  } catch (error) {
    alert('couldnt save location')
  }
}

export const saveLocation = async (location) => {
  try {
    await AsyncStorage.setItem("@save_location", JSON.stringify(location))
  } catch (error) {
    alert('couldnt save location')
  }
}

export const retrieveLocation = async () => {
  try {
    const location = await AsyncStorage.getItem("@save_location")

    return location
  } catch (error) {
    console.log('caught in location block')
  }
}


export const savePushTiming = async (time) => {
  try {
    await AsyncStorage.setItem("@save_pushTiming", JSON.stringify(time))
  } catch (error) {
    alert('couldnt save push time')
  }
}

export const retrievePushTime = async () => {
  try {
    const pushTime = await AsyncStorage.getItem("@save_pushTiming")

    return pushTime
  } catch (error) {
    console.log('caught in push time block')
  }
}
