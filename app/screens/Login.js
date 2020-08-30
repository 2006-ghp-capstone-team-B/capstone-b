import * as React from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { saveUser } from "../store/storageHelper";
import { globalStyles } from "../../styles/globalStyles";
import { login } from "../store/singleUser";
import { Formik } from "formik";
import { Entypo } from 'react-native-vector-icons';


export const Login = (props) => {

  //Hooks to show/hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: "center" }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Password has to be at least 6 character.";
            }
            return errors;
          }}
          //if statement to check that we dont have errors, else make thunk call
          onSubmit={(values) => {
            props.signin(values);
            saveUser(values);
            Actions.main();
          }}
        // call saveUser
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={globalStyles.signUpForm}>
              <Text>Log in</Text>
              <View style={{ marginTop: 30 }}>
                <Text>
                  Email <Text style={{ color: "red" }}> {errors.email ? errors.email : ""}</Text>
                </Text>
                <TextInput
                  style={globalStyles.InputField}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View style={{ marginTop: 30 }}>
                <Text>
                  Password <Text style={{ color: "red" }}> {errors.password ? errors.password : ""}</Text>

                </Text>
                <TextInput
                  secureTextEntry={true}
                  style={globalStyles.InputField}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />

                <Text onClick={togglePasswordVisiblity}> <Entypo name="eye" size={20} /></Text>

                <Button onPress={handleSubmit} title="Submit" />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const mapDispatch = (dispatch) => ({
  signin: (user) => dispatch(login(user)),
  saveLoginUser: (user) => saveUser(user),
});

export default connect(null, mapDispatch)(Login);
