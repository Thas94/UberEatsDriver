import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../Screens/OrderScreen/Index';
import OrderDelivery from '../../Screens/OrderDelivery/Index';
import Profile from '../../Screens/Profile/Index';
import { useAuthContext } from '../../contexts/AuthContext';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {dbCourier,loading} = useAuthContext();
    if(loading){
        return <ActivityIndicator size={"large"} color='green'/>;
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {dbCourier ? (
                <>
                    <Stack.Screen name="Orders" component={OrderScreen} />
                    <Stack.Screen
                    name="OrderDelivery"
                    component={OrderDelivery}
                    />
                </>
            ): (
                <Stack.Screen name = 'Profile' component={Profile} />
            )}
        </Stack.Navigator>
    );
}
export default Navigation;