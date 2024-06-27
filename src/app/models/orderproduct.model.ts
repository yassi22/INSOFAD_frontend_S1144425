import {Options} from "./options.model";
import {ProductVariant} from "./productvariant.model";
import {OrderProductVariant} from "./orderproductvariant.model";

export class OrderProduct {
    id: number;
    imageUrl: string;
    name: string;
    price:number;
    orderProductVariants: OrderProductVariant[];
}