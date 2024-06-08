import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { OrderComponent } from './order/order.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AdminpaneldetailComponent } from './admin/adminpaneldetail/adminpaneldetail.component';
import {AddVariantOptionComponent} from "./admin/add-variant-option/add-variant-option.component";
import {UpdateVariantOptionComponent} from "./admin/update-variant-option/update-variant-option.component";
import {DeleteVariantOptionComponent} from "./admin/delete-variant-option/delete-variant-option.component";


export const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'auth/login', component: LoginComponent },
  {path: 'products/:id', component:ProductDetailComponent}, 
  {path: 'admin/:id', component:AdminpaneldetailComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'order', component: OrderComponent, canActivate: [authGuard] }, 
  {path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'admin/add-variant/:id', component: AddVariantOptionComponent },
  { path: 'admin/update-variant/:id', component: UpdateVariantOptionComponent },
  { path: 'admin/delete-variant/:id', component: DeleteVariantOptionComponent },
  {path: 'products', component: ProductsComponent },
  {path: 'cart', component: CartComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [authGuard]}
  
];
// , canActivate: [authGuard]