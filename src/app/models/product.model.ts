// import { Category } from "./category.model";

import { Options } from "./options.model";
import { ProductVariant } from "./productvariant.model";

export class Product {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public category: string;
  public fitting: string;
  public imageUrl: string;
  public quantity: number;
  public variants: ProductVariant[]; 
  public foundVariants: ProductVariant[]; 

  constructor(id: number, name: string, description: string, price: number, 
    category: string, fitting: string, imageUrl:string, quantity:number = 1) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      this.fitting = fitting;
      this.imageUrl = imageUrl; 
      this.quantity = quantity;
    }
    
}
