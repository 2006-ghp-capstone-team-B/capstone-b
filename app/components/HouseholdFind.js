import React, { useEffect } from "react";
import { Text, TextInput, View, ScrollView, ImageBackground, Button } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";


export default function AddNewItem() {
    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
          <View style={{ marginTop: 30, backgroundColor: 'white', width: '90%', alignSelf: 'center', borderRadius: 25, height: '90%' }}>

          <ScrollView>
              <View style={{ justifyContent: "center" }}>

                <View>
                  <Formik initialValues={{ id: ""}}
                  // replace signin with search thunk
                  onSubmit={(values) => {props.signin(values)}}
          >
                      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View style={{
                            alignSelf: "center",
                            marginTop: 15,
                            flexDirection: 'row',
                            width: '90%'
                          }}>

                          <View style={{flexDirection: 'column', flex: 2}}>
                            <View>
                            <Text>Enter Household Id:</Text>
                            </View>

                            <View >
                                <TextInput
                                    style={{
                                      height: 40,
                                      borderColor: "gray",
                                      borderWidth: 1, width: '90%', borderRadius: 5,
                                  }}
                                    onChangeText={handleChange("id")}
                                    onBlur={handleBlur("id")}
                                    value={values.id}
                                />
                            </View>
                          </View>

                          <View style={{flex: 1, alignSelf: 'flex-end'}}>
                              <Button onPress={handleSubmit} title="Find" />
                          </View>

                          </View>
                      )}
                  </Formik>
                  </View>
              </View>
          </ScrollView>
          </View>
      </ImageBackground>
    )
}
