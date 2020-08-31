import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Title, Text, Button } from 'native-base';
import { globalStyles } from "../../styles/globalStyles";


export default function ModalRequest(props){
  const {type, title, body, closeModal} = props
console.log('ari', props)
  return (
      <View visible={true} style={styles.modalWrapper}>
      <Modal transparent={true}>
        <View style={styles.modalContent}>

            <Button style={{alignSelf: 'flex-end'}} onPress={() => closeModal()}>
              <Text>X</Text>
            </Button>
            <Title style={{alignSelf: 'flex-start', marginVertical: '10%'}}>{title}</Title>
            <Text>{body}</Text>
        {type === 'memberRequest' ?
        <View style={globalStyles.buttonGroupRow}>
          <Button  onPress={() => console.log("ACCEPT")}>
            <Text>Accept</Text>
          </Button>

          <Button  onPress={() => console.log("IGNORE")}>
            <Text>Ignore</Text>
          </Button>
        </View>
        : null
        }
        </View>
      </Modal>
    </View>
  )
}

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
