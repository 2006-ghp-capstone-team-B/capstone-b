import React, { useEffect, useState } from "react";
import { TextInput, View, ScrollView, ImageBackground } from "react-native";
import { Text, Left, Body, Right, Icon, Button } from "native-base";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { findHousehold, addMember } from "../store/households";
import { add } from "react-native-reanimated";

export default function HouseholdFind() {
  const user = useSelector((state) => state.singleUser);
  const [listId, setListId] = useState([""]);
  const [listName, setListName] = useState([""]);
  const [searchErr, setSearchErr] = useState(false);

  const dispatch = useDispatch();
  const fetchList = async (listId) => {
    const household = await dispatch(findHousehold(listId));
    if (household) {
      setListName(household.list.listName);
      setSearchErr(false);
    } else {
      setSearchErr(true);
      setListName([""]);
    }
  };

  const joinList = async (listId, userId) => {
    const join = await dispatch(addMember(listId, userId));
    console.log("newby", join);
  };

  useEffect(() => {
    if (listId[0] !== "") {
      fetchList(Number(listId[0]));
    }
  }, [listId]);

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={globalStyles.backgroundBox}>
        <ScrollView>
          <View style={{ justifyContent: "center" }}>
            <View>
              <Formik
                initialValues={{ id: "" }}
                // replace signin with search thunk, find household name and ID and add to state? Make class component?

                onSubmit={(values) => {
                  setListId([values.id]);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                  <View
                    style={{
                      alignSelf: "center",
                      marginTop: 15,
                      flexDirection: "row",
                      width: "90%",
                    }}
                  >
                    <View style={{ flexDirection: "column", flex: 2 }}>
                      <View>
                        <Text>Enter Household Id:</Text>
                      </View>

                      <View>
                        <TextInput
                          style={{
                            height: 40,
                            borderColor: "gray",
                            borderWidth: 1,
                            width: "90%",
                            borderRadius: 5,
                          }}
                          onChangeText={handleChange("id")}
                          onBlur={handleBlur("id")}
                          value={values.id}
                        />
                      </View>
                    </View>

                    <View style={{ flex: 1, alignSelf: "flex-end" }}>
                      <Button onPress={handleSubmit} title="Find">
                        <Text>Find</Text>
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
              {searchErr ? (
                <Text note style={{ color: "red", alignSelf: "center", width: "90%" }}>
                  You did not search for a valid Household Id. Please enter a different Id and try again.
                </Text>
              ) : null}
            </View>

            {listName[0] !== "" ? (
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 100,
                  flexDirection: "column",
                  width: "50%",
                  borderWidth: 1,
                  borderRadius: 25,
                  borderColor: "grey",
                  height: 200,
                  alignContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={globalStyles.subtitleText}>{listName}</Text>
                  <Text note numberOfLines={1} style={{ alignSelf: "center" }}>
                    Household Id: {listId}
                  </Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                  <Button
                    onPress={() => {
                      joinList(listId, user);
                      alert("Your request has been sent");
                    }}
                  >
                    <Text>Request To Join</Text>
                  </Button>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
