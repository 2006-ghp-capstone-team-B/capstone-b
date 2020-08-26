import * as React from "react";
import { View, Text, ScrollView, Button, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import { createNewUser } from "../store/singleUser";
import { connect } from "react-redux";
import { saveUser } from "../store/storageHelper";
export const CreateUser = (props) => {
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
            <View style={styles.signUpForm}>
              <Text> Create an Account</Text>
              <View style={{ marginTop: 30 }}>
                <Text>
                  Firstname <Text style={{ color: "red" }}> {errors.firstName ? errors.firstName : ""}</Text>
                </Text>
                <TextInput
                  style={styles.InputField}
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
                  style={styles.InputField}
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
  register: (user) => dispatch(createNewUser(user)),
});

export default connect(null, mapDispatch)(CreateUser);
