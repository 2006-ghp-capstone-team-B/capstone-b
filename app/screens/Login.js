import * as React from "react";
import { View, Text, ScrollView, Button, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import { login } from "../store/singleUser";
import { connect } from "react-redux";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { saveUser } from "../store/storageHelper";

export const Login = () => {
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
          onSubmit={async (values) => {
            await props.signin(values);
            props.saveLoginUser(values);
          }}
          // call saveUser
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.signUpForm}>
              <Text>Log in</Text>
              <View style={{ marginTop: 30 }}>
                <Text>
                  Email <Text style={{ color: "red" }}> {errors.email ? errors.email : ""}</Text>
                </Text>
                <TextInput
                  style={styles.InputField}
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
                  style={styles.InputField}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  InputField: { height: 40, borderColor: "gray", borderWidth: 1 },
  signUpForm: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 15,
  },
});

const mapDispatch = (dispatch) => ({
  signin: (user) => dispatch(login(user)),
  saveLoginUser: (user) => dispatch(saveUser(user)),
});

export default connect(null, mapDispatch)(Login);
