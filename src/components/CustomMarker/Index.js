import { Marker } from "react-native-maps";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { View } from 'react-native';


const CustomMaker = ({data, type}) => {
    return (
        <Marker 
        coordinate={{
            latitude: data.lat,
            longitude: data.lng 
        }}
        title={data.name}
        description={data.description}>
            <View style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}>
               {type==="RESTAURANT" ? (<Entypo name="shop" size={30} color="white" />) 
               : (<MaterialIcons name="restaurant" size={30} color="white" />)}
            </View>
        </Marker>
    )
}

export default CustomMaker;