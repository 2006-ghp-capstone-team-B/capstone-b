import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchStorePrefs, createNewPref } from "../store/storePrefs";
import { Container, Header, Left, Body, Right, Title } from 'native-base';


class MessageCenter extends React.Component {
  constructor() {
    super();
  }
  state = {};

  componentDidMount() {
    // this.loadMessages(userId);
   }

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}
const mapState = (state) => {
  return {
    singleUser: state.singleUser,
  };
};

const mapDispatch = (dispatch) => ({
  loadMessages: (userId) => dispatch(fetchMessages(userId)),
});

export default connect(mapState, mapDispatch)(MessageCenter);

