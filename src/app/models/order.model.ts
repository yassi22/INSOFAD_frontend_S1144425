import { Product } from "./product.model";

export class Order {
    public products:Product[];   
    public email: string; 
    

      constructor(products:Product[], email:string){ 
        this.products = products; 
        this.email = email;
    } 
   


    // public productIds: number[];  
    // public productVariantId: number[]; 
    // public optionsId: number[]; 

    // email: string; 

    // constructor(productIds:number[], productVariantId: number[], optionsId: number[] , email:string){ 
    //     this.productIds = productIds; 
    //     this.email = email;
    // } 
   
    
}