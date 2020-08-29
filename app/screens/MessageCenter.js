import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { connect } from "react-redux";
import { fetchNotifications} from "../store/notifications";
import { Container, Header, Content, Body, List,  Title, Text, Button } from 'native-base';
import {Notification} from '../components'


class MessageCenter extends React.Component {
  constructor() {
    super();
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.props.loadMessages(this.props.singleUser.id);
   }

  openModal() {
    this.setState({modalVisible: true})
  }

  closeModal() {
    this.setState({modalVisible: false})
  }

  render() {
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
            ? this.props.notifications.map(message => <Notification key={message.id} message={message} openModal={this.openModal}/>)
          : <Text>You have no new messages</Text>}
          </List>
        </Content>

      {this.state.modalVisible
      ? <View visible={this.state.modalVisible} style={styles.modalWrapper}>
      <Modal transparent={true}>
        <View style={styles.modalContent}>
          <Button onPress={() => this.closeModal()}>
            <Text>X</Text>
          </Button>
          <Text>Testing...</Text>
        </View>
      </Modal>
    </View>
    : null
    }

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

var styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  modalContent: {
    height: '60%',
    width: '60%',
    backgroundColor: "white",
    padding: 22,
    marginTop: '35%',
    alignSelf: 'center',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3
  },
  });
