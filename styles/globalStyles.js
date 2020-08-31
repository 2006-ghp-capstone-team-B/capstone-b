import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const globalStyles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: "#6F9A88",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingTop: Constants.statusBarHeight,
    // },
    bigTitle: {
        color: "white",
        fontSize: 60,
        textAlign: "center",
        marginTop: 50,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6F9A88',
        textAlign: "center",
    },
    subtitleText: {
        fontSize: 20,
        textAlign: "center",
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
        textAlign: "center",
    },
    // body: {
    //     flex: 3,
    //     backgroundColor: '#F2BE00',
    //     padding: 20,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // box: {
    //     alignItems: 'center'
    // },
    background: {
        width: "100%",
        height: "100%",
    },
    backgroundBox: {
        marginVertical: 30,
        backgroundColor: 'white',
        width: '85%',
        flexDirection: 'column',
        borderRadius: 25,
        justifyContent: 'space-between',
        flex: 1,
        alignSelf: 'center',
        paddingVertical: 10
    },
    logo: {
        width: 100,
        height: 100,
        marginLeft: "15%",
        marginTop: "10%",
    },
    // style: {
    //     flex: 1,
    //     justifyContent: "center",
    //     padding: 8,
    //     marginTop: 15,
    // },
    LogInSignUpForm: {
        // flex: 1,
        justifyContent: "center",
        padding: "5%",
    },
    InputField: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        padding: "3%",
    },
    // buttonGroup: {
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    //     position: 'absolute',
    //     width: '100%',
    //     height: '100%',
    //     flex: 1
    // },
    //     borderWidth: 1
    // },
    leftIconStyle: {
        marginRight: 10
    },
    buttonGroup: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1
    },
    buttonGroupRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '10%'
    },
    button: {
        fontSize: 20,
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "80%",
        // borderRadius: 25,
        textAlign: "center",
        fontWeight: "bold",
        padding: "2%",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "5%",
        marginBottom: "5%",
    },
    // mButton: {
    //     fontSize: 16,
    //     backgroundColor: "#6F9A88",
    //     color: "#fff",
    //     width: "80%",
    //     borderRadius: 25,
    //     textAlign: "center",
    //     fontWeight: "bold",
    //     marginLeft: "10%",
    //     marginRight: "10%",
    //     padding: "2%",
    //     marginTop: "5%",
    // },
    // sButton: {
    //     fontSize: 10,
    //     backgroundColor: "#6F9A88",
    //     color: "#fff",
    //     width: "35%",
    //     borderRadius: 25,
    //     textAlign: "center",
    //     fontWeight: "bold",
    //     marginLeft: "5%",
    //     marginRight: "5%",
    //     padding: "2%",
    //     marginTop: "5%",
    // },
    buttonPink: {
        margin: '5%',
        backgroundColor: 'pink'
    },
    buttonPlusMinus: {
        marginHorizontal: '-5%'
    },

    buttonRemove: {
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        marginRight: "50%",
        padding: "3%",
        fontSize: 14,
        marginTop: "5%",
        marginBottom: "5%",
    },
    buttonSave: {
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "50%",
        textAlign: "center",
        fontWeight: "bold",
        marginLeft: "25%",
        padding: "3%",
        fontSize: 15,
        marginTop: "5%",
        marginBottom: "5%",
    },
});
