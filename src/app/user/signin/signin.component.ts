import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  showLoginForm: boolean = false;
  loginForm!: FormGroup;
  loggedInUsername: string = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {
    console.log('SigninComponent initialized.');

    // Subscribe to Router events to detect when navigation has completed
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Reload the page after the navigation has completed
      window.location.reload();
    });
  }

  private initializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.userService.loginUser(loginData).subscribe(
        (response: any) => {
          console.log(response);

          if (response.authenticated) {
            console.log('Signin user:', loginData.username);
            alert(`Login Successful. Welcome, ${loginData.username}!`);

            this.userService.setLoggedInUser(loginData.username);

            // Navigate to the home page
            this.router.navigate(['/home']);
          } else {
            alert('Invalid username or password');
          }
        },
        (error: any) => {
          console.error(error);
          alert('Error during login. Please try again.');
        }
      );
    }
  }

  signup() {
    this.router.navigate(['/signup']).then(() => {
      
      this.userService.signOut();
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
