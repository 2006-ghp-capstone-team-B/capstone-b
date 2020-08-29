import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchNotifications} from "../store/notifications";
import { Container, Header, Content, Body, List,  Title } from 'native-base';
import {Notification} from '../components'


class MessageCenter extends React.Component {
  constructor() {
    super();
  }
  state = {};

  componentDidMount() {
    this.props.loadMessages(this.props.singleUser.id);
   }

  render() {
    console.log("~~~~~~NOTESHERE", this.props.notifications)
    return (
      <Container>
        <Header >
          <Body>
          <Title>Notification Center</Title>
          </Body>
        </Header>
        <Content>
          <List>
            {this.props.notifications
            ? this.props.notifications.map(message => <Notification key={message.id} message={message}/>)
          : <Text>You have no new messages</Text>}
          </List>
        </Content>
      </Container>
    );
  }
}
const mapState = (state) => {
  return {
    singleUser: state.singleUser,
    notifications: state.notifications
  };
};

const mapDispatch = (dispatch) => ({
  loadMessages: (userId) => dispatch(fetchNotifications(userId)),
});

export default connect(mapState, mapDispatch)(MessageCenter);

