import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem } from 'native-base';


export default function RequestNotification(props) {
  const {notificationTitle, notificationBody} = props.message
    return (
        <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="nutrition" />
          </Button>
        </Left>
        <Body>
          <Text>Request Message</Text>
          <Text note numberOfLines={1}>{notificationBody}</Text>
        </Body>
        <Right>
          {/* Button displays ability to accept or reject request */}
          <Button transparent onPress={()=> {
            console.log('PRESSING BUTTON')
            props.openModal()}}>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    )
}
