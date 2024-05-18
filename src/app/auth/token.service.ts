import { Injectable } from '@angular/core';
import { JwtPayload } from './jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _localStorageTokenKey: string = 'token';

  constructor() { }

  public storeToken(token: string){
    localStorage.setItem(this._localStorageTokenKey, token);
  }

  public loadToken(): string | null {
    return localStorage.getItem(this._localStorageTokenKey);
  }

  private getPayload(token: string): JwtPayload{ 
    console.log(token)
    const jwtPayload = token.split('.')[1]; 
    console.log(jwtPayload)
    return JSON.parse(atob(jwtPayload)); 
  }

  private tokenExpired(token: string): boolean {
    const expiry = this.getPayload(token).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public removeToken(){
    localStorage.removeItem(this._localStorageTokenKey);
  }

  public isValid(): boolean{
    const token: string | null = this.loadToken(); 

    console.log('Is token geldig:', token);
    
    if(!token){
      return false;
    }

    if(this.tokenExpired(token)){
      this.removeToken();
      return false;
    }
    return true;
  }


  public getEmail(): string{   

    const token = this.loadToken(); 
    if(token != null){ 
      const checkedToken : string = token!;  
      const email = this.getPayload(checkedToken).email;  
      return email; 
    } else {  
      //error message toevoegen
      return ""; 
    }

 

  } 

  public getUserId():number{ 
    
    const token = this.loadToken(); 
    if(token != null){ 
      const checkedToken : string = token!;  
      const userId = this.getPayload(checkedToken).userId;  
      console.log( "dit is de user id:" + JSON.stringify( userId))
      return userId; 
    } else {  
      //error message toevoegen
      return  0; 
    }

  }




}
