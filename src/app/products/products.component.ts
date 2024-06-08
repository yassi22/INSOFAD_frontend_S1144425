import { Component} from '@angular/core';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service'; 
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ProductVariant} from "../models/productvariant.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public products: Product[] = new Array<Product>();
  public loadingProducts: boolean = true;

  constructor(private productsService: ProductsService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.loadingProducts = false; 
        //producten worden gesorteerd op product id van laag naar hoog.
        products.sort((a,b) => a.id - b.id);

        this.products = products;
      });
  }

  public onBuyProduct(product: Product) {
    this.cartService.addProductToCart(product)
  }

}
