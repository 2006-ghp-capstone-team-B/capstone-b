import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Title, Text, Button } from "native-base";
import { globalStyles } from "../../styles/globalStyles";
import { acceptMember } from "../store/households";
import { useDispatch, useSelector } from "react-redux";

export default function ModalRequest(props) {
  const { type, title, body, requestUserId, requestListId, closeModal } = props;

  const dispatch = useDispatch();

  const acceptingMember = async () => {
    await dispatch(acceptMember(requestUserId, requestListId));
  };

  return (
    <View visible={true} style={styles.modalWrapper}>
      <Modal transparent={true}>
        <View style={styles.modalContent}>
          <Button style={{ alignSelf: "flex-end" }} onPress={() => closeModal()}>
            <Text>X</Text>
          </Button>
          <Title style={{ alignSelf: "flex-start", marginVertical: "10%" }}>{title}</Title>
          <Text>{body}</Text>
          {type === "memberRequest" ? (
            <View style={globalStyles.buttonGroupRow}>
              <Button
                onPress={() => {
                  closeModal();
                  acceptingMember(requestUserId, requestListId);
                }}
              >
                <Text>Accept</Text>
              </Button>

              <Button onPress={() => closeModal()}>
                <Text>Ignore</Text>
              </Button>
            </View>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

var styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    height: "60%",
    width: "60%",
    backgroundColor: "white",
    padding: 22,
    marginTop: "35%",
    alignSelf: "center",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
});
