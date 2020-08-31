import React, { useEffect } from "react";
import { Text, TextInput, View, ScrollView, ImageBackground, Button } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";


export default function HouseholdCreate() {
  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={globalStyles.backgroundBox}>
        <ScrollView>
          <Text style={globalStyles.subtitle}>Create a New household! </Text>
          <Text>You will receive an ID for your household list once you've submitted.</Text>
          <Text>Share the Household ID with your housemates so they can request to join, or invite them directly. </Text>
          <Formik initialValues={{ listName: "" }} onSubmit={(values) => { props.signin(values) }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={globalStyles.LogInSignUpForm}>
                <Text>Enter Household Name:</Text>
                <TextInput
                  style={globalStyles.InputField}
                  onChangeText={handleChange("listName")}
                  onBlur={handleBlur("listName")}
                  value={values.listName}
                />
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>

        </ScrollView>
      </View>
    </ImageBackground>
  )
}
