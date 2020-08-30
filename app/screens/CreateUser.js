import * as React from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import { useState } from "react";
import { connect } from "react-redux";
import { saveUser } from "../store/storageHelper";
import { createNewUser } from "../store/singleUser";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";
import { Entypo } from 'react-native-vector-icons';

export const CreateUser = (props) => {

  //Hooks to show/hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
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
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={globalStyles.signUpForm}>
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
  register: (user) => dispatch(createNewUser(user)),
});

export default connect(null, mapDispatch)(CreateUser);
