import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../Screens/OrderScreen/Index';
import OrderDelivery from '../../Screens/OrderDelivery/Index';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
    
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Orders" component={OrderScreen} />
            <Stack.Screen
            name="OrderDelivery"
            component={OrderDelivery}
            />
        </Stack.Navigator>
    );
}
export default Navigation;