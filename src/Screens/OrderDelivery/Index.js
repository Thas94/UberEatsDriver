import { View, Text, FlatList, StyleSheet, Button, useWindowDimensions,ActivityIndicator, Pressable } from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import { useRef, useMemo, useEffect, useState } from 'react';
import {FontAwesome5, Fontisto} from '@expo/vector-icons';
import styles from './styles';
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from "aws-amplify";
import { Order, User, OrderDish } from "../../models";
import { useOrderContext } from '../../contexts/OrderContext';


const ORDER_STATUSES = {
    READY_FOR_PICKUP: "READY_FOR_PICKUP",
    ACCEPTED: "ACCEPTED",
    PICKED_UP: "PICKED_UP"
}

const OrderDelivery = () => {

    const [dishItems, setDishItems] = useState([]);
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [driverLocation, setDriverLocation] = useState(null);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalKm, setTotalKm] = useState(0);
    const [isDriverClose, setisDriverClose] = useState(false);
    const [deliveryStatus, setdeliveryStatus] = useState(ORDER_STATUSES.READY_FOR_PICKUP);
    const mapRef = useRef(null);

    const snapPoints = useMemo(() => ['12%', '95%'], []);
    const bottomSheetRef = useRef(null);
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id;

    const {acceptOrder} = useOrderContext();

    useEffect(() => {
        if(!id){
            return;
        }
        DataStore.query(Order, id).then(setOrder);
    },[id]);

    useEffect(() => {
        if(!order){
            return;
        }
        DataStore.query(User, order.userID).then(setUser); 

        DataStore.query(OrderDish, od => od.orderID('eq', order.id)).then(setDishItems);
    },[order])

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (!status === "granted") {
            console.log("Nonono");
            return;
          }
    
          let location = await Location.getCurrentPositionAsync();
          setDriverLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        })();
    
        const foregroundSubscription = Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 100,
          },
          (updatedLocation) => {
            setDriverLocation({
              latitude: updatedLocation.coords.latitude,
              longitude: updatedLocation.coords.longitude,
            });
          }
        );
        return foregroundSubscription;
      }, []);

    //console.warn(driverLocation);  

    
    onButtonPressed = () => {
        if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP){
            bottomSheetRef.current?.collapse();
            mapRef.current.animateToRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.location,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
            setdeliveryStatus(ORDER_STATUSES.ACCEPTED)
            acceptOrder(order);
        }
        if(deliveryStatus === ORDER_STATUSES.ACCEPTED){
            bottomSheetRef.current?.collapse();
            setdeliveryStatus(ORDER_STATUSES.PICKED_UP);
        }
        if(deliveryStatus === ORDER_STATUSES.PICKED_UP){
            bottomSheetRef.current?.collapse();
            navigation.goBack();
            console.warn('Delivery finished')
        }
    }   

    const renderButtonTitle = () => {
        if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP){
            return 'Accept Order';
        }
        if(deliveryStatus === ORDER_STATUSES.ACCEPTED){
            return 'Pick-Up order';
        }
        if(deliveryStatus === ORDER_STATUSES.PICKED_UP){
            return 'Delivery complete';
        }
    }

    const isButtonPressable = () => {
        if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP){
            return false
        }
        if(deliveryStatus === ORDER_STATUSES.ACCEPTED && isDriverClose){
            return false
        }
        if(deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose){
            return false
        }
        return true;
    }

    const restaurantLocation = {latitude: order?.Restaurant?.lat, longitude: order?.Restaurant?.lng};
    const deliveryLocation = {latitude: user?.lat, longitude: user?.lng};

    if (!driverLocation ) {
        return <ActivityIndicator size={"large"}/>;
    }
    if (!driverLocation || !order || !user) {
        return <ActivityIndicator size={"large"} color='green'/>;
    }

    console.log('items',dishItems)

    return(
        <View style={styles.container}>
            <MapView
            ref={mapRef} 
            style={{ width, height }} 
            showsUserLocation
            followsUserLocation
            initialRegion={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07
            }}>
            <MapViewDirections 
                origin={driverLocation}
                destination = {
                    deliveryStatus === ORDER_STATUSES.ACCEPTED ?
                        restaurantLocation 
                     : deliveryLocation
                    }
                strokeWidth={10}
                waypoints={
                    deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP ? [
                    restaurantLocation,
                ] : []}
                strokeColor='#3fc060'
                apikey={'AIzaSyCiHCl7OdZFwm-klYKWKgbobKujtdMiMpk1'} 
                onReady={(results) => {
                    setisDriverClose(results.distance <= 0.1);
                    setTotalMinutes(results.duration);
                    setTotalKm(results.distance);
 
                }}
            />
            <Marker 
            coordinate={{
                latitude: order.Restaurant.lat,
                longitude: order.Restaurant.lng 
            }}
            title={order.Restaurant.name}
            description={order.Restaurant.description}>
                <View style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}>
                    <Entypo name="shop" size={30} color="white" />
                </View>
            </Marker>
            <Marker
            coordinate={deliveryLocation}
            title={user.name}
            description={user.description}>
                <View style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}>
                     <MaterialIcons name="restaurant" size={30} color="white" />
                </View>
            </Marker>
            </MapView>
            {deliveryStatus == ORDER_STATUSES.READY_FOR_PICKUP && (
                <Ionicons 
                onPress={()=> navigation.goBack()}
                name='arrow-back-circle'
                size={45}
                color='black'
                style={{top: 40, left: 15, position: 'absolute'}}
            />
            )}

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
                        <Text style={styles.restaurantAddress}>{user.address}</Text>
                    </View>

                    <View style={styles.orderContainer}>
                        {dishItems.map((dishItems) => (
                            <Text style={styles.order} key={dishItems.id}>{dishItems.Dish.name} x{dishItems.quantity}</Text>
                        ))}
                    </View>
                </View>
                <Pressable style={{...styles.buttonContainer, backgroundColor: isButtonPressable() ? 'grey' : '#3fc060'}} onPress={onButtonPressed} disabled={isButtonPressable()}>
                    <Text  style={styles.buttonText}>{renderButtonTitle()}</Text>
                </Pressable>
            </BottomSheet>
        </View>
    );
};


export default OrderDelivery;