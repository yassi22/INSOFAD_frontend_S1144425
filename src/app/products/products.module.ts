import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductThumbnailComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgOptimizedImage
    ],
  exports: [
    ProductsComponent
  ]

})
export class ProductsModule { }
