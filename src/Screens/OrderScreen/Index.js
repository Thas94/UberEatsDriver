import { useRef, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native"; 
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import OrderItem from '../../components/OrderItem/Index';
import MapView from "react-native-maps";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";
import CustomMaker from '../../components/CustomMarker/Index';
import * as Location from "expo-location";


const OrderScreen = () => {

  const [orders, setorders] = useState([]);
  const bottomSheetRef = useRef(null);
  const {width, height} = useWindowDimensions();
  const [driverLocation, setDriverLocation] = useState(null);

  const snapPoints = useMemo(() => ["12%", "95%"], []);

  const fetchOrders = () =>{
    DataStore.query(Order, (order) => 
    order.status('eq', 'READY_FOR_PICKUP')).then(setorders);
  }  

  useEffect(() => {
    fetchOrders();

    const subscription = DataStore.observe(Order).subscribe((msg) => {
      if(msg === 'UPDATE'){
        fetchOrders();
      }
      return () => subscription.unsubscribe(); 
    });

  },[]);

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

  },[]);

  if (!driverLocation) {
    return <ActivityIndicator size={"large"} color='green'/>;
  }
    // renders
    return (
        <View style={{backgroundColor: 'lightblue', flex: 1}}>
          <MapView style={{height, width}}
           showsUserLocation 
           followsUserLocation
           initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }} >
            {orders.map((order) => (
             <CustomMaker key={order.id} data={order.Restaurant} type="RESTAURANT"/> 

            ))}

          </MapView>

          <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} handleIndicatorStyle={{backgroundColor: 'grey', width: 100}}>
            <View style={{marginBottom: 20, alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '600', letterSpacing: 0.5, paddingBottom: 5}}>You're Online</Text>
              <Text style={{letterSpacing: 0.5, color: 'grey'}}>Available Orders: {orders.length}</Text>
            </View>
            <BottomSheetFlatList 
                data={orders}
                renderItem= {({item}) => <OrderItem order={item}/>}
                />
          </BottomSheet>
        </View>
      );
};

export default OrderScreen;