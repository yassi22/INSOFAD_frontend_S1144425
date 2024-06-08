import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest } from './auth-request.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginEndpoint: string = 'http://localhost:8080/api/auth/login';
  private _registerEndpoint: string = 'http://localhost:8080/api/auth/register';

  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  public $userRole: BehaviorSubject<string | null > = new BehaviorSubject<string | null >(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.isValid()) {
      this.$userIsLoggedIn.next(true);
    }
  }


  public login(authRequest: AuthRequest): Observable<AuthResponse> {
      console.log(authRequest);
    return this.http
      .post<AuthResponse>(this._loginEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          this.$userIsLoggedIn.next(true);
          this.$userRole.next(this.tokenService.getRole());
          console.log("geeft de user role terug:");
          console.log(this.$userRole);
          console.log(this.$userRole);
        })
      );
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this._registerEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          this.$userIsLoggedIn.next(true); 
          this.$userRole.next(this.tokenService.getRole());
        })
      );
  }

  public logOut(): void {
    this.tokenService.removeToken();
    this.$userIsLoggedIn.next(false); 
    this.$userRole.next(null); 
  }
}
