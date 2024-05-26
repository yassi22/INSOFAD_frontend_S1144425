import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})

export class NavigationComponent implements OnInit {
  public showHotCupIcon: boolean = false;
  public userIsLoggedIn: boolean = false; 
  public hasAdminRole: boolean = false; 
  
  public title: string = 'Just Another Day';

  public amountOfProducts: number = 0;

  constructor(private cartService: CartService, private router: Router,  private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit() {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.amountOfProducts = products.length;
    })
    this.checkLoginState();

    this.checkRole();
}
  public onLogout(): void{ 
    this.authService.logOut();
    this.router.navigate(['']);
  }


public checkLoginState(): void{
    this.authService
    .$userIsLoggedIn
    .subscribe((loginState: boolean) => {
      this.userIsLoggedIn = loginState;
    });
  }


public checkRole(): void {    

  this.authService
  .$userRole
  .subscribe((userRole: string | null) => {
    if(userRole == "ROLE_ADMIN") {
      this.hasAdminRole = true;
    } else { 
      this.hasAdminRole = false; 
    }
    
  })


 
}


}