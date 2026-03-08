import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Helper } from '../../helper';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  errorMessage: string = '';

  constructor(
    private service: Helper,
    private cookie: CookieService,
  ) {
    this.loginInfo.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    });
  }

  loginInfo: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  login() {
    this.errorMessage = '';
    if (this.loginInfo.valid) {
      this.service.postLogin(this.loginInfo.value).subscribe({
        next: (data: any) => {
          this.cookie.set('user_token', data.access_token);
          this.close();
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error?.error || 'Invalid email or password';
          this.cdr.detectChanges();
        },
      });
    }
  }

  close() {
    this.router.navigate(['/']);
  }
}
