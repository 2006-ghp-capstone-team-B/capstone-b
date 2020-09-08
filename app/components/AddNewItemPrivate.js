import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, ScrollView, ImageBackground, Button, KeyboardAvoidingView, Image } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";
import { getListPrivate, addNewItem } from "../store/listPrivate";
import { Actions } from "react-native-router-flux";

export default function AddNewItemPrivate(props) {
  const { listId, userId } = props;
  const dispatch = useDispatch();
  const submitNewItem = (values, listId, userId) => {
    dispatch(addNewItem(values, listId, userId));
  };

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={globalStyles.backgroundBox}>
        <Text style={globalStyles.titleText2}> Add new item </Text>

        <Image source={require("../../assets/pea.jpg")} style={{ height: 180, width: 180, alignSelf: "center" }} />
        <Formik
          initialValues={{ itemName: "", quantity: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.itemName) {
              errors.itemName = "Required";
            } else if (!values.quantity) {
              errors.quantity = "Required";
            }
            return errors;
          }}
          onSubmit={async (values) => {
            await submitNewItem(values, listId, userId);
            Actions.pop();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={globalStyles.LogInSignUpForm}>
              <View style={{ marginTop: 0, marginLeft: 20, marginRight: 20 }}>
                <Text>
                  Item Name <Text style={{ color: "red" }}> </Text>
                </Text>
                <TextInput
                  style={globalStyles.InputField}
                  onChangeText={handleChange("itemName")}
                  onBlur={handleBlur("itemName")}
                  value={values.itemName}
                />
              </View>

              <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 150 }}>
                <Text>
                  Item Quantity <Text style={{ color: "red" }}> {errors.quantity ? errors.quantity : ""}</Text>
                </Text>
                <TextInput
                  style={globalStyles.InputField}
                  onChangeText={handleChange("quantity")}
                  onBlur={handleBlur("quantity")}
                  value={values.quantity}
                />
                <Button onPress={handleSubmit} title="Add" />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
