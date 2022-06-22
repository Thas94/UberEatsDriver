import { createContext, useEffect, useState, useContext } from 'react';
import {Auth, DataStore} from 'aws-amplify';
import { Courier, Order,User,OrderDish } from '../models';
import { useAuthContext } from './AuthContext';

const OrderContext = createContext({});

const OrderContextProvider = ({children}) => {
    const {dbCourier} = useAuthContext();
    const [order,setOrder] = useState();
    const [user, setUser] = useState();
    const [dishes, setDishes] = useState();

    const fetchOrder = async(id) => {
        if(!id){
            setOrder(null);
            return;
        }
        const fetchedOrder = await DataStore.query(Order, id);
        setOrder(fetchedOrder);

        DataStore.query(User, fetchedOrder.userID).then(setUser); 

        DataStore.query(OrderDish, od => od.orderID('eq', fetchedOrder.id)).then(setDishes);

    }

    const acceptOrder = () => {
        //update the order, change the status and assign the driver
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = 'ACCEPTED';
                updated.Courier = dbCourier;
            })
        ).then(setOrder)
    }

    const completeOrder = () => {
        //update the order, change the status and assign the driver
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = 'COMPLETED';
                updated.Courier = dbCourier;
            })
        ).then(setOrder)
    }

    const pickUpOrder = () => {
        //update the order, change the status and assign the driver
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = 'PICKED_UP';
                updated.Courier = dbCourier;
            })
        ).then(setOrder)
    }

    return (
    <OrderContext.Provider value={{acceptOrder, order,user,dishes, fetchOrder, pickUpOrder, completeOrder}}> 
        {children} 
    </OrderContext.Provider> 
    );  
};

export default OrderContextProvider; 

export const useOrderContext = () => useContext(OrderContext);