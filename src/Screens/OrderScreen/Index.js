import { useRef, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import OrderItem from '../../components/OrderItem/Index';
import MapView from "react-native-maps";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";
import CustomMaker from '../../components/CustomMarker/Index';


const OrderScreen = () => {

  const [orders, setorders] = useState([]);
  const bottomSheetRef = useRef(null);
  const {width, height} = useWindowDimensions();

  const snapPoints = useMemo(() => ["12%", "95%"], []);

  useEffect(() => {
    DataStore.query(Order, (order) => 
      order.status('eq', 'READY_FOR_PICKUP')).then(setorders);
  },[]);
    // renders
    return (
        <View style={{backgroundColor: 'lightblue', flex: 1}}>
          <MapView style={{height, width}} showsUserLocation followsUserLocation >
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