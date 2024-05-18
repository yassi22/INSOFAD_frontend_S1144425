export class Order {
    public product_id: number[];
    userEmail: string; 

    constructor(product_id:number[], user_email:string){ 
        this.product_id = product_id; 
        this.userEmail = user_email;
    } 
   
    
}