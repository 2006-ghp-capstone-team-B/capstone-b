import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, ImageBackground, Button } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholds } from "../store/households";
import { Actions } from "react-native-router-flux";
import { Formik } from "formik";

export default function HouseholdProfile() {
    const renderItem = ({ item }) => (
        <View>
            <Text>{item.firstName} {item.lastName}</Text>
        </View>
    );

    const navigate = (screen) => {
        Actions[screen]();
    };

    const { listHouseholdId, listHouseholdName, listHouseholdMembers } = useSelector((state) => state.households);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadAllHouseholds = (userId) => {
        dispatch(getAllHouseholds(userId));
    };

    useEffect(() => {
        loadAllHouseholds(user.id);
    }, [user.id]);
    console.log(listHouseholdName)
    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <View style={globalStyles.backgroundBox}>

                <View key={listHouseholdId}>
                    <View>
                        <Text style={globalStyles.titleText}> {listHouseholdName}</Text>
                    </View>
                    <View>
                        <Text style={globalStyles.subtitleText}>Household ID: {listHouseholdId}</Text>
                    </View>
                    <View>
                        <Text style={globalStyles.subtitleText}>Household Members: </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                        {listHouseholdMembers !== undefined && listHouseholdMembers.length !== 0
                            ?
                            <SafeAreaView >
                                <FlatList
                                    data={listHouseholdMembers}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </SafeAreaView>
                            :
                            <Text style={globalStyles.paragraph}>Household member not found!</Text>
                        }
                    </View>
                </View>


                <Text style={globalStyles.subtitleText}> Invite a member to join your Household:  </Text>
                <View style={globalStyles.LogInSignUpForm}>
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
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                            <View style={globalStyles.signUpForm}>
                                <View style={{ marginTop: 30 }}>
                                    <Text> Your household member's first name </Text>
                                    <TextInput
                                        style={globalStyles.InputField}
                                        onChangeText={handleChange("firstName")}
                                        onBlur={handleBlur("firstName")}
                                        value={values.firstName}
                                    />
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text> Your household member's email </Text>
                                    <Text style={{ color: "red" }}>
                                        {errors.email ? errors.email : ""}
                                    </Text>

                                    <TextInput
                                        style={globalStyles.InputField}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                </View>
                                <Button onPress={handleSubmit} title="Submit" />
                            </View>
                        )}
                    </Formik>
                </View>


                <Text style={globalStyles.subtitleText}> Delete a member from your household:  </Text>
                <Text style={globalStyles.paragraph}> TBD drop down list? </Text>


            </View>
        </ImageBackground>
    )
}