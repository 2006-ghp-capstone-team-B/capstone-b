import React from "react";
import { Text, Body, Left, Right, Button, Switch, ListItem, View } from 'native-base';
import {StyleSheet} from 'react-native'


export default function ButtonTest(props) {
    return (
      <View >
          <Button style={styles.button} onPress={()=> console.log("privateList")}>
            <Text>Items</Text>
          </Button>
          <Switch value={false} />
          </View>
    )
}


var styles = StyleSheet.create({
  button: {
    margin: '5%',
    backgroundColor: 'pink'
  }
})
