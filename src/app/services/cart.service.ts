import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductVariant } from '../models/productvariant.model'; 
import { Options } from '../models/options.model';
import {OrderProduct} from "../models/orderproduct.model";
import {OrderProductVariant} from "../models/orderproductvariant.model";
import {OrderOptions} from "../models/orderoptions.model";

const localStorageKey: string = "products-in-cart";
const ordersKey: string = "user-orders";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: Product[] = []; 
  public $productInCart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]); 

  public $productVariantInCart: BehaviorSubject<ProductVariant[]> = new BehaviorSubject<ProductVariant[]>([]);  
  public $optionsInCart : BehaviorSubject<Options[]> = new BehaviorSubject<Options[]>([]); 

  private userEmailKey: string = 'user-email';
  private productsInCartSubject = new Subject<Product[]>(); 

  
  
  
  constructor() {
    this.loadProductsFromLocalStorage();
  }
  

  public addProductToCart(product: Product) {
    this.productsInCart.push(product);
    this.saveProductsAndNotifyChange();
  }

  public removeProductFromCart(product_index: number) {
    this.productsInCart.splice(product_index, 1);
    this.saveProductsAndNotifyChange();
  }

  public allProductsInCart(): Product[] {
    return this.productsInCart.slice();
  } 


  public getTotalPrice(): number {
    let subtotal = this.productsInCart.reduce((acc, product) => acc + product.price, 0);
    if (subtotal > 0) {
      return subtotal + 4.95;
    } else {
      return 0;
    }
  }

  public clearCart() {
    this.productsInCart = [];
    this.saveProductsAndNotifyChange();
  }

  public saveUserEmail(email: string): void {
    localStorage.setItem(this.userEmailKey, email);
  }

  public getUserEmail(): string|null {
    return localStorage.getItem(this.userEmailKey);
  }

  public clearCartAndUserEmail(): void{
    this.clearCart();
    localStorage.removeItem(this.userEmailKey);
  }

  private saveProductsAndNotifyChange(): void {
    this.saveProductsToLocalStorage(this.productsInCart.slice());
    this.$productInCart.next(this.productsInCart.slice());
  }

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(products))
  }

  private loadProductsFromLocalStorage(): void {
    let productsOrNull = localStorage.getItem(localStorageKey)
    if (productsOrNull != null) {
      let products: Product[] = JSON.parse(productsOrNull)
      this.productsInCart = products
      this.$productInCart.next(this.productsInCart.slice());
    }
  }

  public placeOrder(email: string): void{
    const orders = this.getOrders();
    orders[email] = this.productsInCart;
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    this.clearCart();
  }

  public getOrdersForEmail(email: string): Product[] {
    const orders = this.getOrders();
    return orders[email] || [];
  }

  private getOrders(): { [email: string]: Product[] } {
    const ordersJson = localStorage.getItem(ordersKey);
    return ordersJson ? JSON.parse(ordersJson) : {};
  }

  public updateProductQuantity(index: number, quantity: number): void{
    if (index >=0 && index < this.productsInCart.length) {
      const product = this.productsInCart[index];
      product.quantity = quantity;
      this.productsInCartSubject.next(this.productsInCart);
    }
  }

  calculateTotalPrice(product: OrderProduct): number {
    if (!product) {
      console.error("Product is undefined or null");
      return 0;
    }

    const basePrice = product.price || 0;
    const variantsPrice = product.orderProductVariants.reduce((total: number, variant: OrderProductVariant) => {
      const optionsPrice = variant.orderOptions.reduce((optionTotal: number, option: OrderOptions) => optionTotal + (option.added_price || 0), 0);
      return total + optionsPrice;
    }, 0);
    return basePrice + variantsPrice;
  }




}
