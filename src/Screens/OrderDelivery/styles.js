import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container : {
        backgroundColor: 'lightblue', 
        flex: 1
    },
    handleIndicatorStyle: {
        backgroundColor: 'grey',
         width: 100
    },
    handleIndicatorContainer: {
        marginTop:10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 20
    },
    deliveryTime: {
        fontSize: 20, 
        letterSpacing: 1
    },
    shoppingBagIcon: {
        marginHorizontal: 10
    },
    distance: {
        fontSize: 20, 
        letterSpacing: 1
    },
    orderDetailsContainer: {
        paddingHorizontal: 15
    },
    restaurantName: {
        fontSize: 25, 
        letterSpacing: 1, 
        paddingVertical: 20
    },
    restaurantContainer: {
        flexDirection: 'row', 
        marginBottom: 15, 
        alignItems: 'center'
    },
    restaurantAddress: {
        fontSize: 20, 
        color: 'grey', 
        fontWeight: '500' ,
        marginLeft: 10, 
        alignItems: 'center'
    },
    orderContainer: {
        borderTopWidth: 1,
         borderColor: 'lightgrey',
         paddingTop: 10
    },
    order: {
        fontSize: 18, color: 'grey',
         fontWeight: '500',
         letterSpacing: 0.5, 
        marginBottom: 5
    },
    buttonContainer: {
        backgroundColor: '#3fc060',
         marginTop: 'auto',
         marginVertical: 30,
         marginHorizontal: 10, 
         borderRadius: 10
    },
    buttonText: {
        color: 'white', 
        paddingVertical: 15, 
        fontWeight: '500',
        fontSize: 20 ,
        textAlign: 'center'
    }
});