import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TransportationModes {
  DRIVNG = "DRIVNG",
  BYCLING = "BYCLING",
  WALKING = "WALKING"
}

export enum OrderStatus {
  NEW = "NEW",
  COOKING = "COOKING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}



type CourierMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusketMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusketDishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderDishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Courier {
  readonly id: string;
  readonly name: string;
  readonly sub: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly transportationMode?: TransportationModes | keyof typeof TransportationModes | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Courier, CourierMetaData>);
  static copyOf(source: Courier, mutator: (draft: MutableModel<Courier, CourierMetaData>) => MutableModel<Courier, CourierMetaData> | void): Courier;
}

export declare class Busket {
  readonly id: string;
  readonly BusketDishes?: (BusketDish | null)[] | null;
  readonly userID: string;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Busket, BusketMetaData>);
  static copyOf(source: Busket, mutator: (draft: MutableModel<Busket, BusketMetaData>) => MutableModel<Busket, BusketMetaData> | void): Busket;
}

export declare class BusketDish {
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly busketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly busketDishDishId?: string | null;
  constructor(init: ModelInit<BusketDish, BusketDishMetaData>);
  static copyOf(source: BusketDish, mutator: (draft: MutableModel<BusketDish, BusketDishMetaData>) => MutableModel<BusketDish, BusketDishMetaData> | void): BusketDish;
}

export declare class Dish {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly price: number;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Dish, DishMetaData>);
  static copyOf(source: Dish, mutator: (draft: MutableModel<Dish, DishMetaData>) => MutableModel<Dish, DishMetaData> | void): Dish;
}

export declare class OrderDish {
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDishDishId?: string | null;
  constructor(init: ModelInit<OrderDish, OrderDishMetaData>);
  static copyOf(source: OrderDish, mutator: (draft: MutableModel<OrderDish, OrderDishMetaData>) => MutableModel<OrderDish, OrderDishMetaData> | void): OrderDish;
}

export declare class Order {
  readonly id: string;
  readonly userID: string;
  readonly Restaurant?: Restaurant | null;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderDishes?: (OrderDish | null)[] | null;
  readonly Courier?: Courier | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderRestaurantId?: string | null;
  readonly orderCourierId?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly deliveryFee: number;
  readonly minDeliveryTime: number;
  readonly maxDeliveryTime: number;
  readonly rating?: number | null;
  readonly image?: string | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly address: string;
  readonly Dishes?: (Dish | null)[] | null;
  readonly Buskets?: (Busket | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders?: (Order | null)[] | null;
  readonly Buskets?: (Busket | null)[] | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}