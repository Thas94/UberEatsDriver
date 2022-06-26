import { View, Text, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo} from 'react';
import {FontAwesome5, Fontisto} from '@expo/vector-icons';
import styles from './styles';
import { useOrderContext } from '../../contexts/OrderContext';
import { useNavigation, useRoute } from '@react-navigation/native';


const STATUS_TO_TITLE = {
    READY_FOR_PICKUP: 'Accept Order',
    ACCEPTED: 'Pick-Up order',
    PICKED_UP: 'Delivery complete'
}

const BottomSheetDetails = (props) => {

    const {totalKm, totalMinutes,onAccepted} = props;
    const isDriverClose = totalKm <= 1;

    const {acceptOrder, order ,user,dishes, completeOrder, pickUpOrder} = useOrderContext();
    const snapPoints = useMemo(() => ['12%', '95%'], []);
    const bottomSheetRef = useRef(null);
    const navigation = useNavigation();


    onButtonPressed = async () => { 
        if(order.status === "READY_FOR_PICKUP"){
            bottomSheetRef.current?.collapse();
            acceptOrder();
            onAccepted();
        }
        if(order.status === "ACCEPTED"){
            bottomSheetRef.current?.collapse(); 
            pickUpOrder();
        }
        if(order.status === "PICKED_UP"){
            await completeOrder();
            bottomSheetRef.current?.collapse();
            navigation.goBack();
            //console.warn('Delivery finished')
        }
    }  


    const isButtonPressable = () => {
        if(order.status === "READY_FOR_PICKUP"){
            return false
        }
        if(order.status === "ACCEPTED" && isDriverClose){
            return false
        }
        if(order.status === "PICKED_UP" && isDriverClose){
            return false
        }
        return true;
    }

    return(
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} handleIndicatorStyle={styles.handleIndicatorStyle}>
        <View style={styles.handleIndicatorContainer}>
            <Text style={styles.deliveryTime}>{totalMinutes.toFixed(0)} mins</Text>
            <FontAwesome5 name='shopping-bag' size={30} color='#3fc060' style={styles.shoppingBagIcon}/>
            <Text style={styles.distance}>{totalKm.toFixed(2)} km</Text>
        </View>
        <View style={styles.orderDetailsContainer}>

            <Text style={styles.restaurantName}>{order.Restaurant.name}</Text>
            <View style={styles.restaurantContainer}>
                <Fontisto name='shopping-store' size={22} color='grey'/>
                <Text style={styles.restaurantAddress}>{order.Restaurant.address}</Text>
            </View>
            <View style={styles.restaurantContainer}>
                <Fontisto name='map-marker-alt' size={30} color='grey'/>
                <Text style={styles.restaurantAddress}>{user?.address}</Text>
            </View>

            <View style={styles.orderContainer}>
                {dishes?.map((dishItems) => (
                    <Text style={styles.order} key={dishItems.id}>{dishItems.Dish.name} x{dishItems.quantity}</Text>
                ))}
            </View>
        </View>
        <Pressable style={{...styles.buttonContainer, backgroundColor: isButtonPressable() ? 'grey' : '#3fc060'}} onPress={onButtonPressed} disabled={isButtonPressable()}>
            <Text  style={styles.buttonText}>{STATUS_TO_TITLE[order.status]}</Text>
        </Pressable>
    </BottomSheet>
    )
}

export default BottomSheetDetails;