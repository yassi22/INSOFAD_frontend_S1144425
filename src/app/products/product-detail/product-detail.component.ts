import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {CartService} from '../../services/cart.service';
import {ProductVariant} from '../../models/productvariant.model';
import {Options} from '../../models/options.model';
import {PopupComponent} from "../../popup/popup.component";

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        PopupComponent
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

    public selectedProductVariant: [ProductVariant | null, number | null] = [null, null];
    public defaultprice: number = 0;
    public errorMessage: string | null = null;
    public successMessage: string | null = null;
    public showPopup: boolean = false;
    public popupType: 'success' | 'warning' | 'danger' | 'info' = 'info';
    public copyProduct: Product;
    public optionsDict: { [key: string]: Options } = {};
    @Input() public product!: Product;
    @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();
    private productId: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productsService: ProductsService,
        private cartService: CartService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.productId = params['id'];

        });

        this.productsService
            .getProductByIndex(this.productId)
            .subscribe((product: Product) => {
                this.product = product;
                product.variants.sort((a, b) => a.id - b.id);
                this.product.price = product.price;
                if (this.defaultprice == 0) {
                    this.defaultprice = product.price;
                }
                this.copyProduct = structuredClone(product);
                this.copyProduct.variants.forEach((variant) => {
                    variant.options = [];
                });

                this.product.variants.forEach((variant: ProductVariant) => {
                    variant.options.sort((a, b) => a.id - b.id);
                });


            });


    }


    public addToPrice(additional_cost: number, productVariant: ProductVariant, productOptions: Options) {


        let options_cost = productOptions.added_price;

        this.optionsDict[productVariant.name] = productOptions

        let total_additionalcost = 0;


        for (let optionKey in this.optionsDict) {
            let optionPrice = this.optionsDict[optionKey].added_price;

            total_additionalcost += optionPrice;
        }

        this.product.price = this.defaultprice + total_additionalcost;

    }


    public buyProduct(product: Product) {


        this.errorMessage = null;
        this.successMessage = null;
        this.showPopup = false;

        let productQuantity = product.quantity;

        if (Object.keys(this.optionsDict).length === 0) {
            alert("Please select options before buying the product.");
            return;
        }

        // Check if all options are selected
        let allOptionsSelected = true;
        for (let variant of product.variants) {
            if (!this.optionsDict[variant.name]) {
                allOptionsSelected = false;
                break;
            }
        }

        if (!allOptionsSelected) {
            alert("Please select options for all variants before buying the product.");
            return;
        }


        if (productQuantity > 0) {
            for (let variantName in this.optionsDict) {
                for (const variant of this.copyProduct.variants) {
                    if (variant.name == variantName) {
                        variant.options = [];
                        variant.options.push(this.optionsDict[variantName]);

                    }
                }


            }


            this.cartService.addProductToCart(this.copyProduct)
            this.product.quantity -= 1;
            this.successMessage = 'Product added to cart';
            this.popupType = 'success';
            this.showPopup = true;

        } else {
            // alert("Product is out of stock");
            this.successMessage = 'Product is out of stock';
            this.popupType = 'warning';
            this.showPopup = true;
        }


    }

    public closePopup() {
        this.showPopup = false;
    }


}
