import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service'; 
import { ProductVariant } from '../../models/productvariant.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  private productId: number; 
  public selectedProductVariant: [ProductVariant | null , number | null ] = [null, null]; 
  
  @Input() public product!: Product;
  @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();


  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService, 
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.productsService
    .getProductByIndex(this.productId)
    .subscribe((product: Product) => {
      this.product = product; 
      this.product.price = product.price; 
      console.log(product);
    }); 

  }  

  public addToPrice(additional_cost: number, productVariant:ProductVariant){  
      this.selectedProductVariant.forEach((variant: any) => { 
          if(variant.includes(productVariant)) {
           let previous_additional_cost =  this.selectedProductVariant[1]; 
           this.product.price -= previous_additional_cost ?? 0; 
           this.product.price += additional_cost; 
           variant[1] = additional_cost; 
            return;  
          } 

          this.selectedProductVariant.push(productVariant); 
          this.selectedProductVariant[1] = additional_cost;  
          this.product.price += additional_cost; 
      });
      this.product.price += additional_cost; 
    

  } 

  public removeFromPrice(additional_cost: number){
    this.product.price -= additional_cost;  
  }


  public buyProduct(product: Product) {
    this.cartService.addProductToCart(product)
  }


}
