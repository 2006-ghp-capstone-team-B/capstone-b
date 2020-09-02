import React from "react";
import { Text, TextInput, View, ScrollView, ImageBackground, Button } from "react-native";
import { connect } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { createNewHousehold } from "../store/households";
import { Actions } from "react-native-router-flux";
import { Formik } from "formik";

export function HouseholdCreate(props) {
  const { userId } = props
  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={globalStyles.backgroundBox}>
        <ScrollView style={{ margin: "15%" }}>
          <Text style={globalStyles.subtitleText}>Create a New household! </Text>
          <Text style={globalStyles.paragraph}>You will receive an ID for your household list once you've submitted.</Text>
          <Text style={globalStyles.paragraph}>Share the Household ID with your housemates so they can request to join, or invite them directly. </Text>

          <Formik initialValues={{ listName: "" }}
            onSubmit={async (values) => {
              props.newHousehold(values.listName, userId);
              Actions.pop();
            }}
          >
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
  );
};

const mapDispatch = (dispatch) => ({
  newHousehold: (listName, userId) => { dispatch(createNewHousehold(listName, userId)) }
});

export default connect(null, mapDispatch)(HouseholdCreate);