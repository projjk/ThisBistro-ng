import {OrderItem} from "./orderItem";

export interface Order {
  id: number,
  status: number,
  price: number,
  date: Date,
  memo: string,
  orderItems: OrderItem[],
  userId: string
}
