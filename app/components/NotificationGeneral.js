import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem } from "native-base";
import { markRead } from "../store/notifications";
import { useDispatch, useSelector } from "react-redux";
export default function GeneraltNotification(props) {
  const dispatch = useDispatch();
  const markingRead = (notificationId) => {
    dispatch(markRead(notificationId));
  };

  const { id, notificationTitle, notificationBody, type } = props.message;

  let iconType;
  if(type === 'welcome') {
    iconType = 'party-popper'
  } else if (type === 'newItem') {
    iconType = 'nutrition'
  } else {
    iconType = 'party-popper'
  }
  return (
    <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: "#1BB49D" }}>
          <Icon active name={iconType} />
        </Button>
      </Left>
      <Body>
        <Text numberOfLines={1}>{notificationTitle}</Text>
        <Text note numberOfLines={1}>
          {notificationBody}
        </Text>
      </Body>
      <Right>
        {/* BUTTON JUST DISPLAYS FULL MESSAGE */}
        <Button
          transparent
          onPress={() => {
            props.openModal(type, notificationTitle, notificationBody);
            markingRead(id);
          }}
        >
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );
}
