import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo } from 'react';
import {FontAwesome5, Fontisto} from '@expo/vector-icons';
import orders from '../../../assets/data/orders.json';
import styles from './styles';

const order = orders[0];

const OrderDelivery = () => {

    const snapPoints = useMemo(() => ['12%', '95%'], []);
    const bottomSheetRef = useRef(null);


    return(
        <View style={styles.container}>
            <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} handleIndicatorStyle={styles.handleIndicatorStyle}>
                <View style={styles.handleIndicatorContainer}>
                    <Text style={styles.deliveryTime}>14 mins</Text>
                    <FontAwesome5 name='shopping-bag' size={30} color='#3fc060' style={styles.shoppingBagIcon}/>
                    <Text style={styles.distance}>5 km</Text>
                </View>
                <View style={styles.orderDetailsContainer}>

                    <Text style={styles.restaurantName}>{order.Restaurant.name}</Text>
                    <View style={styles.restaurantContainer}>
                        <Fontisto name='shopping-store' size={22} color='grey'/>
                        <Text style={styles.restaurantAddress}>{order.Restaurant.address}</Text>
                    </View>
                    <View style={styles.restaurantContainer}>
                        <Fontisto name='map-marker-alt' size={30} color='grey'/>
                        <Text style={styles.restaurantAddress}>{order.User.address}</Text>
                    </View>

                    <View style={styles.orderContainer}>
                        <Text style={styles.order}>Steak x1</Text>
                        <Text style={styles.order}>Chips x2</Text>
                        <Text style={styles.order}>Burger x5</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text  style={styles.buttonText}>Accept Order</Text>
                </View>
            </BottomSheet>
        </View>
    );
};


export default OrderDelivery;