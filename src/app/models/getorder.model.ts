import {Product} from "./product.model";
import {OrderProduct} from "./orderproduct.model";

export class GetOrder {
    public orderId: number;
    public datum: Date; 
    public orderTitle: string;
    public orderPrice: number;
    public orderProducts: OrderProduct[];
  } 
  