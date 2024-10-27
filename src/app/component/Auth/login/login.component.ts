import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  returnUrl: string = '/home'; // Default return URL

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Here you can get the return URL if passed in the navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.returnUrl = navigation.extras.state['from'] || this.returnUrl;
    }
  }

  async handleSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all fields.';
      setTimeout(() => this.error = '', 5000);
      return;
    }

    const {email, password} = this.loginForm.value;

    try {
      const response = await this.apiService.loginUser({email, password}).toPromise();
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        // localStorage.setItem('role', response.role);
        await this.router.navigate([this.returnUrl]);
      }
    } catch (error) {
      // @ts-ignore
      this.error = error?.error?.message || error.message;
      setTimeout(() => this.error = '', 5000);
    }
  }
}
