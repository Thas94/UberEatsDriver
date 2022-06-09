import { useRef, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import orders from '../../../assets/data/orders.json';
import OrderItem from '../../components/OrderItem/Index';

const OrderScreen = () => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['12%', '95%'], []);

    // renders
    return (
        <View style={{backgroundColor: 'lightblue', flex: 1}}>
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