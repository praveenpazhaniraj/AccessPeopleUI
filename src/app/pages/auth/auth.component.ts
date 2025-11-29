import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  clientId = '';
  clientSecret = '';
  errorMessage = '';  

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    // Check if token exists and is valid
    const token = localStorage.getItem('token');
    if (token && this.api.isTokenValid(token)) {
      this.router.navigate(['/tests']); // redirect if valid
    }
  }
  login() {
    this.api.authenticate(this.clientId, this.clientSecret).subscribe({
      next: (res: any) => {
        if (res.access_token) {
          this.api.setToken(res.access_token);
          this.router.navigate(['/tests']); // redirect after login
        } else {
          this.errorMessage = res.error || 'Authentication failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Login failed, please try again.';
      },
    });
  }}
