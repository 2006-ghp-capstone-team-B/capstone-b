import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem } from "native-base";
import { markRead } from "../store/notifications";
import { useDispatch, useSelector } from "react-redux";
export default function RequestNotification(props) {
  const dispatch = useDispatch();
  const markingRead = (notificationId) => {
    dispatch(markRead(notificationId));
  };
  const { id, notificationTitle, notificationBody, type, requestUserId, requestListId } = props.message;
  return (
    <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: "#FF9501" }}>
          <Icon active name="ios-person" />
        </Button>
      </Left>
      <Body>
        <Text numberOfLines={1}>{notificationTitle}</Text>
        <Text note numberOfLines={1}>
          {notificationBody}
        </Text>
      </Body>
      <Right>
        {/* Button displays ability to accept or reject request */}
        <Button
          transparent
          onPress={() => {
            props.openModal(type, notificationTitle, notificationBody, requestUserId, requestListId);
            markingRead(id);
          }}
        >
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );
}
