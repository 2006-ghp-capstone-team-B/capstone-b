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
    header: {
        flex: 0.3,
        backgroundColor: '#BF2F0B',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    logo: {
        alignItems: 'center',
        width: 300,
        height: 200,
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
    }
});