// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "DRIVNG": "DRIVNG",
  "BYCLING": "BYCLING",
  "WALKING": "WALKING"
};

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED"
};

const { Courier, Busket, BusketDish, Dish, OrderDish, Order, Restaurant, User } = initSchema(schema);

export {
  Courier,
  Busket,
  BusketDish,
  Dish,
  OrderDish,
  Order,
  Restaurant,
  User,
  TransportationModes,
  OrderStatus
};