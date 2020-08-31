import React from "react";
import { Text, Body, Left, Right, Button, Icon, ListItem, View } from 'native-base';
import RequestNotification from './NotificationRequest'
import GeneralNotification from './NotificationGeneral'

export default function Notification(props) {
  const {type} = props.message


    return (
      <View>
        {type === 'memberRequest'
          ? <RequestNotification message={props.message} openModal={props.openModal}/>
          : <GeneralNotification message={props.message} openModal={props.openModal}/>
          }
      </View>
    )
}
