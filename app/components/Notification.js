import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem } from 'native-base';


export default function Notification(props) {
  const {notificationTitle, notificationBody} = props.message
    return (
        <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="nutrition" />
          </Button>
        </Left>
        <Body>
          <Text>{notificationTitle}</Text>
          <Text note numberOfLines={1}>{notificationBody}</Text>
        </Body>
        <Right>
          <Button transparent>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    )
}
