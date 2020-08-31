import React, { useEffect } from "react";
import { Text, TextInput, View, ScrollView, ImageBackground, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { createNewHouseholdList } from "../store/listHousehold";


export function HouseholdCreate(props) {

  const navigate = (screen) => {
    Actions[screen]();
  };

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={globalStyles.backgroundBox}>
        <ScrollView style={{ margin: "15%" }}>
          <Text style={globalStyles.subtitleText}>Create a New household! </Text>
          <Text style={globalStyles.paragraph}>You will receive an ID for your household list once you've submitted.</Text>
          <Text style={globalStyles.paragraph}>Share the Household ID with your housemates so they can request to join, or invite them directly. </Text>


          <Formik initialValues={{ listName: "" }}
            onSubmit={(values) => {
              props.newHouseholdList(values)
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
  newHouseholdList: (listName) => {dispatch(createNewHouseholdList(listName))},
});
export default connect(null, mapDispatch)(HouseholdCreate);

/*
After the user clicked the submit button, screen with Household Profile
<TouchableOpacity onPress={() => navigate("HouseholdProfile")} title="Add New Member">
  <Text style={globalStyles.button}>Add New Member</Text>
</TouchableOpacity>
*/
