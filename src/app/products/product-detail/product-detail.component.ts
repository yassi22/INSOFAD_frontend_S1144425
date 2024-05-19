import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  private productId: number;
  
  
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
    }); 

  } 

  public buyProduct(product: Product) {
    this.cartService.addProductToCart(product)
  }


}
