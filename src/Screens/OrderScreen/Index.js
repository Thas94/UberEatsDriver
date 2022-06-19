import { useRef, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import orders from '../../../assets/data/orders.json';
import OrderItem from '../../components/OrderItem/Index';
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";

const OrderScreen = () => {
  const bottomSheetRef = useRef(null);
  const {width, height} = useWindowDimensions();

  const snapPoints = useMemo(() => ["12%", "95%"], []);

    // renders
    return (
        <View style={{backgroundColor: 'lightblue', flex: 1}}>
          <MapView style={{height, width}} showsUserLocation followsUserLocation >
            {orders.map((order) => (
              <Marker key={order.id} title={order.Restaurant.name} description={order.Restaurant.address} 
                            coordinate={{latitude: order.Restaurant.lat, longitude: order.Restaurant.lng}}>
              <View style={{backgroundColor: 'green', padding: 5, borderRadius: 10}}>
                <Entypo name="shop" size={24} color='white' />
              </View>
            </Marker>
            ))}

          </MapView>

          <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} handleIndicatorStyle={{backgroundColor: 'grey', width: 100}}>
            <View style={{marginBottom: 20, alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '600', letterSpacing: 0.5, paddingBottom: 5}}>You're Online</Text>
              <Text style={{letterSpacing: 0.5, color: 'grey'}}>Available Orders: {orders.length}</Text>
            </View>
            <FlatList 
                data={orders}
                renderItem= {({item}) => <OrderItem order={item}/>}
                />
          </BottomSheet>
        </View>
      );
};

export default OrderScreen;