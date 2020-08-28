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
    containerScroll: {
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitleText: {
        fontSize: 20,
        alignItems: 'center',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    body: {
        flex: 3,
        backgroundColor: '#F2BE00',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body2: {
        flex: 3,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        backgroundColor: '#BF2F0B',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F2BE00',
        fontWeight: 'bold',
        lineHeight: 1,
    },
    photo: {
        alignItems: 'center',
        width: 400,
        height: 300,
    },
    promos: {
        alignItems: 'center',
        flexShrink: 1,
        width: 450,
        height: 500,
    },
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
        backgroundColor: "#6F9A88",
        color: "#fff",
        width: "80%",
        borderRadius: 25,
        textAlign: "center",
        fontWeight: "bold",
        marginLeft: "10%",
        padding: "4%",
        fontSize: 25,
        marginTop: "10%",
        marginBottom: '10%'
    },
    style: {
        flex: 1,
        justifyContent: "center",
        padding: 8,
        marginTop: 15,
    },
});
