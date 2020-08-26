import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { login } from "../store/singleUser";
import { readUser } from "../store/storageHelper";
import Main from "./Main";
import Intro from "./Intro";
/*
This will be our initial screen where people can log in/ sign up.
If user wants to stay logged in, we can add logic here to directly skip onto the "user home" (Home component)
*/

const Start = () => {
  const [user, setUser] = useState([""]);
  const dispatch = useDispatch();
  const logUserIn = (user) => {
    dispatch(login(user));
  };

  useEffect(() => {
    async function checkUser() {
      const loggedInUser = await readUser();
      if (loggedInUser !== "null") {
        setUser(loggedInUser);
      } else {
        return;
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    if (user !== null && user.email !== "undefined") {
      let string = user;
      console.log("strrrrrrrr", string);
      const newObj = JSON.parse(string);
      console.log("newwwwwwwwwwww", newObj);
      let { email } = newObj;
      console.log(email, "maillllll");
      logUserIn({ email: `${email}` });
      // logUserIn();
      // console.log(user.length, "lenghtttttttttt");
      // string = JSON.parse(string);
      // console.log(string, "lenghtttttttttt");

      // console.log(user[0], "^&^^^^^^^^^^^ before logUserIn");
      // console.log(user.email, "email???????");
      // logUserIn(user);
    }
  }, [user]);

  const navigate = (screen) => {
    Actions[screen]();
  };

  if (user !== null) {
    return <Main />;
  } else {
    return <Intro />;
  }
};

export default Start;
