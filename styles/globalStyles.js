import { StyleSheet } from 'react-native';
import constants from 'expo-constants';

//Below is a bunch of sample styles code for the app. You may edit or delete any piece
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6F9A88",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: constants.statusBarHeight,
    },
    containerTop: {
        flex: 1,
        alignItems: "center",
        paddingTop: constants.statusBarHeight,
    },
    containerScroll: {
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green',
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
    body: {
        flex: 3,
        backgroundColor: '#F2BE00',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // body2: {
    //     flex: 3,
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // footer: {
    //     backgroundColor: '#BF2F0B',
    //     padding: 20,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     color: '#F2BE00',
    //     fontWeight: 'bold',
    //     lineHeight: 1,
    // },
    // photo: {
    //     alignItems: 'center',
    //     width: 400,
    //     height: 300,
    // },
    // promos: {
    //     alignItems: 'center',
    //     flexShrink: 1,
    //     width: 450,
    //     height: 500,
    // },
    box: {
        alignItems: 'center'
    },
    background: {
        width: "100%",
        height: "100%",
    },
    logo: {
        width: 100,
        height: 100,
        marginLeft: "15%",
        marginTop: "10%",
    },
    header: {
        color: "white",
        fontSize: 60,
        textAlign: "center",
        marginTop: 50,
    },
    button: {
        fontSize: 25,
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "80%",
        borderRadius: 25,
        textAlign: "center",
        fontWeight: "bold",
        marginLeft: "10%",
        marginRight: "10%",
        padding: "2%",
        marginTop: "5%",
    },
    mButton: {
        fontSize: 16,
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "80%",
        borderRadius: 25,
        textAlign: "center",
        fontWeight: "bold",
        marginLeft: "10%",
        marginRight: "10%",
        padding: "2%",
        marginTop: "5%",
    },
    sButton: {
        fontSize: 10,
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "35%",
        borderRadius: 25,
        textAlign: "center",
        fontWeight: "bold",
        marginLeft: "5%",
        marginRight: "5%",
        padding: "2%",
        marginTop: "5%",
    },
    style: {
        flex: 1,
        justifyContent: "center",
        padding: 8,
        marginTop: 15,
    },
    signUpForm: {
        flex: 1,
        justifyContent: "center",
        padding: 8,
        marginTop: 15,
    },
    InputField: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
});