import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem } from 'native-base';


export default function GeneraltNotification(props) {
  const {notificationTitle, notificationBody, type} = props.message
    return (
        <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="nutrition" />
          </Button>
        </Left>
        <Body>
          <Text>General Notification</Text>
          <Text note numberOfLines={1}>{notificationBody}</Text>
        </Body>
        <Right>
          {/* BUTTON JUST DISPLAYS FULL MESSAGE */}
          <Button transparent onPress={()=>
            props.openModal(type, notificationTitle, notificationBody)}>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    )
}
