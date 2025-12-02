import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests: any[] = [];
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void { 
    const token = this.api.getToken();

    // If no token → return to login
    if (!token) {
      this.router.navigate(['/auth']);
      return;
    }

    // If token exists, fetch tests
    this.api.fetchAssessmentTests(token).subscribe({
      next: (res) => {
        this.tests = res;
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = "Token expired or invalid.";
          localStorage.removeItem("token");
          this.router.navigate(['/auth']);
        } else {
          this.errorMessage = "Failed to load tests.";
        }
      }
    });
  }

  goNext() {
    this.router.navigate(['/generate-link']);
  }
 
}
