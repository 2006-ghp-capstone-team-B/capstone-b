import * as React from "react";
import { View, Text, ScrollView, Button, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { saveUser } from "../store/storageHelper";
import { createNewUser } from "../store/singleUser";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";
import { FormInput } from "../components";
import { Ionicons } from "react-native-vector-icons";

export const CreateUser = (props) => {
  //Navigate to Log In from SignUp
  const navigate = (screen) => {
    Actions[screen]();
  };
  goToLogIn = () => navigate("login");

  // Use hooks to set initial state:
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [leftIcon, setLeftIcon] = useState("ios-eye");
  // Change state:
  const togglePasswordVisiblity = () => {
    setPasswordVisibility(!passwordVisibility);
    setLeftIcon(leftIcon === "ios-eye" ? "ios-eye-off" : "ios-eye");
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: "center" }}>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid email address";
            }

            if (!values.firstName) {
              errors.firstName = "Required";
            }

            if (!values.lastName) {
              errors.lastName = "Required";
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
            props.register(values);
            saveUser(values);
            alert("Welcome To Peasy!");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={globalStyles.LogInSignUpForm}>
              <Text> Create an Account</Text>
              <View style={{ marginTop: 30 }}>
                <Text>
                  Firstname <Text style={{ color: "red" }}> {errors.firstName ? errors.firstName : ""}</Text>
                </Text>
                <TextInput
                  style={globalStyles.InputField}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />
              </View>
              <View style={{ marginTop: 30 }}>
                <Text>
                  Lastname <Text style={{ color: "red" }}> {errors.lastName ? errors.lastName : ""} </Text>
                </Text>
                <TextInput
                  style={globalStyles.InputField}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
              </View>
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
                  secureTextEntry={passwordVisibility}
                  // style={globalStyles.InputField}
                  onChangeText={handleChange("password")}
                  placeholder="Enter password, min. 6 characters"
                  onBlur={handleBlur("password")}
                  value={values.password}
                  leftIcon={
                    <TouchableOpacity onPress={togglePasswordVisiblity}>
                      <Ionicons name={leftIcon} size={20} />
                    </TouchableOpacity>
                  }
                />

                <Button onPress={handleSubmit} title="Submit" />
              </View>
              <Button
                title="Already have an account? Log In"
                onPress={goToLogIn}
                titleStyle={{
                  color: "#F57C00",
                }}
                type="clear"
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const mapDispatch = (dispatch) => ({
  register: (user) => dispatch(createNewUser(user)),
});

export default connect(null, mapDispatch)(CreateUser);
