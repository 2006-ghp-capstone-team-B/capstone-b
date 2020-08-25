import React from "react";
import { View, StyleSheet} from "react-native";
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

export default function Main() {
  return (
    <View >
      <Dashboard />
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '10%'
  },
  header: {
    color: "white",
    fontSize:  60,
    textAlign: "center",
    marginTop: 50
  },
  button: {
    backgroundColor: 'white',
    color: '#3A59FF',
    width: "65%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '18%',
    padding: "2%",
    fontSize:  33,
    marginTop: '10%'
  },
  style: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 15
  },
});
