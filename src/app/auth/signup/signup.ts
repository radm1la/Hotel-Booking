import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Helper } from '../../helper';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private cdr = inject(ChangeDetectorRef);
  errorMessage: string = '';

  constructor(
    private router: Router,
    private service: Helper,
  ) {
    this.formInfo.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    });
  }

  close() {
    this.router.navigate(['/']);
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formInfo.get(controlName);
    return !!(
      control?.invalid &&
      (control?.dirty || control?.touched) &&
      control?.hasError(errorType)
    );
  }

  formInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(120)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('+995', [Validators.required, Validators.pattern(/^\+995\d{9}$/)]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern(/^\d{4,10}$/)]),
    avatar: new FormControl('', [
      Validators.pattern(/\.(jpg|jpeg|png|webp|avif|gif)$/i),
      Validators.required,
    ]),
    gender: new FormControl('', [Validators.required]),
  });

  register() {
    this.errorMessage = '';
    if (this.formInfo.valid) {
      this.service.postSignUp(this.formInfo.value).subscribe({
        next: (data: any) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status == 409) {
            this.errorMessage = err.error.error;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }
}
