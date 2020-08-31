import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem } from 'native-base';


export default function RequestNotification(props) {
  const {notificationTitle, notificationBody, type} = props.message
    return (
        <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="ios-person" />
          </Button>
        </Left>
        <Body>
          <Text>Request Message</Text>
          <Text note numberOfLines={1}>{notificationBody}</Text>
        </Body>
        <Right>
          {/* Button displays ability to accept or reject request */}
          <Button transparent onPress={()=>
            props.openModal(type, notificationTitle, notificationBody)}>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    )
}
