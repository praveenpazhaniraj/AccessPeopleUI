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
    if (!token) {
      this.router.navigate(['/auth']);
      return;
    }

    this.api.fetchAssessmentTests(token).subscribe({
      next: (res) => (this.tests = res),
      error: () => (this.errorMessage = 'Failed to fetch tests'),
    });
  }

  generateLink(accountCode: string) {
    this.router.navigate(['/generate-link', accountCode]);
  }
}
