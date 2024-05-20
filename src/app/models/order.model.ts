export class Order {
    public productIds: number[];  
    public productVariantId: number[]; 
    public optionsId: number[]; 

    email: string; 

    constructor(productIds:number[], productVariantId: number[], optionsId: number[] , email:string){ 
        this.productIds = productIds;  
        this.productVariantId = productVariantId; 
        this.optionsId = optionsId; 
        this.email = email;
    } 
   
}