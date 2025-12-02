import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']    
})

export class AuthComponent {

  clientId = '';
  clientSecret = '';
  errorMessage = '';

  constructor(private api: ApiService,private router: Router) { }

  login() {
    if (!this.clientId || !this.clientSecret) {
      this.errorMessage = "Client ID & Client Secret are required";
      return;
    }

    this.api.authenticate(this.clientId, this.clientSecret).subscribe({
      next: (res) => {
        if (res.error) {
          this.errorMessage = res.error;
          return;
        }

        if (res.access_token) {
          this.api.setToken(res.access_token);

          // Redirect to tests page
          this.router.navigate(['/tests']);
        }
      },
      error: () => {
        this.errorMessage = "Invalid client credentials";
      }
    });
  }
}
