import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {PopupComponent} from "../../popup/popup.component";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
    imports: [ReactiveFormsModule, PopupComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
    public errorMessage: string | null = null;
    public successMessage: string | null = null;
    public showPopup: boolean = false;
    public popupType: 'success' | 'warning' | 'error' | 'info' = 'info';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]]
    });
  }

  public onSubmit() {
      this.errorMessage = null;
      this.successMessage = null;
      this.showPopup = false;

    this.authService
      .login(this.loginForm.value)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                this.errorMessage = 'Er is een fout opgetreden bij het inloggen';
                this.popupType = 'error';
                this.showPopup = true;
                return throwError(() => error);
            })
        )
      .subscribe({
        next: (authReponse: AuthResponse) => {
        console.log('AuthResponse: ', authReponse);
            this.successMessage = 'U bent succesvol ingelogd';
            this.popupType = 'success';
            this.showPopup = true;
            setTimeout(() => {
                this.router.navigate(['/products']);
            }, 1500);
        },
        error: (error) => {
          console.error('Login failed:', error);
            this.errorMessage = 'De inlog gevens zijn niet juist ingevuld';
            this.popupType = 'error';
            this.showPopup = true;
        }
      });
  }

    public closePopup() {
        this.showPopup = false;
    }
}
