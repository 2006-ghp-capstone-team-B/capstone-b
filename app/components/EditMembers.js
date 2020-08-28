import React, { useEffect } from "react";
import { Text, TextInput, View, ScrollView, ImageBackground, Button } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";

export default function EditMembers() {
    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <View style={{ marginTop: 30 }}>
                <Text style={globalStyles.subtitleText}> Invite a member to join your Household:  </Text>
            </View>
            <ScrollView>
                <View style={{ justifyContent: "center" }}>
                    <Formik
                        initialValues={{ name: "", email: "" }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "Required";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Invalid email address";
                            }
                            return errors;
                        }}
                    //if statement to check that we dont have errors, else make thunk call
                    // onSubmit={(values) => {
                    //     props.signin(values);

                    //     Actions.main();
                    // }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                            <View style={globalStyles.signUpForm}>

                                <View >
                                    <Text>
                                        Your household member's first name <Text style={{ color: "red" }}> </Text>
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
                                        Your household member's email <Text style={{ color: "red" }}> {errors.email ? errors.email : ""}</Text>
                                    </Text>
                                    <TextInput
                                        style={globalStyles.InputField}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                    <Button onPress={handleSubmit} title="Submit" />
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={globalStyles.subtitleText}> Delete a member from your household:  </Text>
                    <Text style={globalStyles.paragraph}> TBD drop down list? </Text>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}
