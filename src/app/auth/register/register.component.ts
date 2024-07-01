import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {PopupComponent} from "../../popup/popup.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
    imports: [ReactiveFormsModule, PopupComponent]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  public showPopup: boolean = false;
  public popupType: 'success' | 'warning' | 'danger' | 'info' = 'info';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      repeated_password: ['', [Validators.required]], 
      firstname: [''], 
      lastname: ['']
    });
  }

  public onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.showPopup = false;

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (authResponse: { token: string }) => {
          console.log(authResponse.token, 'User registered');
          this.successMessage = 'U are now registerd';
          this.popupType = 'success';
          this.showPopup = true;
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = 'Fill the right credentials in';
          this.popupType = 'danger';
          this.showPopup = true;}
      });
    }
  }

  public closePopup() {
    this.showPopup = false;
  }

}
