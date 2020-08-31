import * as React from "react";
import { View, Text, ScrollView, Button, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";
import { saveUser } from "../store/storageHelper";
import { globalStyles } from "../../styles/globalStyles";
import { login } from "../store/singleUser";
import { Formik } from "formik";
import { FormInput } from '../components'
import { Ionicons } from 'react-native-vector-icons';


export const Login = (props) => {
  //Navigate to Sign up from Login
  const navigate = (screen) => {
    Actions[screen]();
  };
  const goToSignup = () => navigate('signup')

  // Use hooks to set initial state:
  const [passwordShown, setPasswordShown] = useState(true);
  const [leftIcon, setLeftIcon] = useState('ios-eye');
  // Change state:
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
    setLeftIcon(leftIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye');
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
            <View style={globalStyles.LogInSignUpForm}>
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
                <FormInput
                  secureTextEntry={passwordShown}
                  // style={globalStyles.InputField}
                  onChangeText={handleChange("password")}
                  placeholder='Enter password, min. 6 characters'
                  onBlur={handleBlur("password")}
                  value={values.password}
                  leftIcon={<TouchableOpacity onPress={togglePasswordVisiblity} >
                    <Ionicons name={leftIcon} size={20} />
                  </TouchableOpacity>}
                />


                <Button onPress={handleSubmit} title="Submit" />
              </View>
              <Button
                title="Don't have an account? Sign Up"
                onPress={goToSignup}
                titleStyle={{
                  color: '#F57C00'
                }}
                type='clear'
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView >
  );
};

const mapDispatch = (dispatch) => ({
  signin: (user) => dispatch(login(user)),
  saveLoginUser: (user) => saveUser(user),
});

export default connect(null, mapDispatch)(Login);
