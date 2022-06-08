import { StyleSheet, Text, View, Image } from 'react-native';
import {Entypo} from '@expo/vector-icons'; 


const OrderItem = ({order}) => {
  return (
      <View style={{flexDirection:'row', margin:10, borderColor: '#3fc060', borderWidth: 2, borderRadius: 12}}>
        <Image source={{uri: order.Restaurant.image}} style={{width: '25%', height:'100%', borderBottomLeftRadius: 10, borderTopLeftRadius: 10}}/>
        <View style={{marginLeft:10, flex: 1, paddingVertical: 5}}>
          <Text style={{fontSize:15, fontWeight: '500'}}>{order.Restaurant.name}</Text>
          <Text style={{color: 'grey'}}>{order.Restaurant.address}</Text>
          <Text style={{marginTop: 10}}>Delivery Details:</Text>
          <Text style={{color: 'grey'}}>{order.User.name}</Text>
          <Text style={{color: 'grey'}}>{order.User.address}</Text>
        </View> 
        <View style={{padding:5 ,backgroundColor: '#3fc060',borderBottomRightRadius: 10, borderTopRightRadius: 10,
          alignItems: 'center', justifyContent: 'center'}}>
          <Entypo name='check' size={30} color='white' style={{marginLeft: 'auto'}}/>
        </View>
      </View>
  );
}

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
