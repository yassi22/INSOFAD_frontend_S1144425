import { Component, EventEmitter, Input, Output} from '@angular/core'; 
import { ProductsService } from '../services/products.service'; 
import { Product } from '../models/product.model';  
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router';
import {PopupComponent} from "../popup/popup.component";

@Component({ 

  selector: 'app-admin, app-product-thumbnail',
  standalone: true,
    imports: [CommonModule, RouterLink, PopupComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  public products: Product[] = new Array<Product>();

  public loadingProducts: boolean = true;

    public errorMessage: string | null = null;
    public successMessage: string | null = null;
    public showPopup: boolean = false;
    public popupType: 'success' | 'warning' | 'danger' | 'info' = 'info';

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService
        .getProducts()
        .subscribe((products: Product[]) => {
          this.loadingProducts = false;
          this.products = products;
          products.sort((a, b) => a.id - b.id);

        });
  }

  updateProductQuantity(product: Product) {
      this.errorMessage = null;
      this.successMessage = null;
      this.showPopup = false;


      const element: HTMLInputElement | null = document.getElementById(String(product.id)) as HTMLInputElement;


    if (element) {
      const newQuantity = Number(element.value);
      product.quantity = newQuantity;

        this.successMessage = 'Product quantity updated';
        this.popupType = 'success';
        this.showPopup = true;

      this.productsService.updateProductQuantity(product);

    }


  }

    public closePopup() {
        this.showPopup = false;
    }


    refreshProduct() {
    this.productsService
        .getProducts()
        .subscribe((products: Product[]) => {
          this.loadingProducts = false;
          this.products = products;
          products.sort((a, b) => a.id - b.id);

        });
  }



}