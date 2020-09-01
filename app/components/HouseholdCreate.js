import React, { useEffect } from "react";
import { Text, TextInput, View, ScrollView, ImageBackground, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { createNewHouseholdList, createNewHouseholdListAccess } from "../store/listHousehold";
import { Actions } from "react-native-router-flux";
import { Formik } from "formik";
import axios from "axios";
import { MY_IP } from "../../secret";


export default function HouseholdCreate(props) {
  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={globalStyles.backgroundBox}>
        <ScrollView style={{ margin: "15%" }}>
          <Text style={globalStyles.subtitleText}>Create a New household! </Text>
          <Text style={globalStyles.paragraph}>You will receive an ID for your household list once you've submitted.</Text>
          <Text style={globalStyles.paragraph}>Share the Household ID with your housemates so they can request to join, or invite them directly. </Text>


          <Formik initialValues={{ listName: "" }}
            onSubmit={async (values) => {
              // props.newHouseholdList(values);
              const userId = 1;
              const { data } = await axios.post(`http://${MY_IP}:19006/api/lists`, values);
              await axios.post(`http://${MY_IP}:19006/api/lists/access/${data}/${userId}`);
              Actions.AllHouseholds();
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

// const mapState = (state) => {
//   return {
//     singleUser: state.singleUser,
//   };
// };

// const mapDispatch = (dispatch) => ({
//   newHouseholdList: (listName, userId) => { dispatch(createNewHouseholdList(listName, userId)) },
//   // newHouseholdListAccess: (listId, userId) => { dispatch(createNewHouseholdListAccess(listId, userId)) }
// });
// export default connect(mapState, mapDispatch)(HouseholdCreate);