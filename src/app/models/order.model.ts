export class Order {
    public productIds: number[];
    email: string; 

    constructor(productIds:number[], email:string){ 
        this.productIds = productIds; 
        this.email = email;
    } 
   
    
}