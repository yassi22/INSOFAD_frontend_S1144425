import { Component, EventEmitter, Input, Output} from '@angular/core'; 
import { ProductsService } from '../services/products.service'; 
import { Product } from '../models/product.model';  
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router';

@Component({ 

  selector: 'app-admin, app-product-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent { 

  public products: Product[] = new Array<Product>(); 
  
  public loadingProducts: boolean = true; 

   
  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.loadingProducts = false;  
        console.log(products); 
        this.products = products; 
        console.log("testing");
      });
  }  


  
  public deleteProductVariantAndOptions(product:Product) {  
 
     
   
  } 



}
