import React, { useEffect } from "react";
import { View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import households, { getAllHouseholds } from "../store/households"
import { Actions } from "react-native-router-flux";
import { Text, Left, Right, Button, Icon, Container, Content, List, ListItem } from 'native-base';
import HouseholdButton from './HouseholdButton'
import { Directions } from "react-native-gesture-handler";

export default function AllHouseholds() {

  const allHouseholds = useSelector((state) => state.households);
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const loadHouseholds = (userId) => {
    dispatch(getAllHouseholds(userId));
  };

  useEffect(() => {
    loadHouseholds(user.id);
  }, [user]);

  const renderHousehold = ({ item }) => {
    return (
      <HouseholdButton household={item} />
    )
  };

  return (
    <Container>
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <View style={globalStyles.backgroundBox}>

          {allHouseholds.length > 0
            ? <SafeAreaView >
              <FlatList
                data={allHouseholds}
                renderItem={renderHousehold}
                keyExtractor={household => household.listId.toString()}
              />
            </SafeAreaView>
            : <Text>You do not currently belong to a household</Text>}

          <View>
            <Button block iconLeft style={globalStyles.button} onPress={() => Actions.HouseholdCreate({ userId: user.id })}>
              <Icon name='ios-add' />
              <Text>Create A Household</Text>
            </Button>
            <Button block iconLeft style={globalStyles.button} onPress={() => Actions.HouseholdFind({ allHouseholds: allHouseholds })}>
              <Icon name='ios-add' />
              <Text>Request To Join A Household</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </Container>
  );
}
