import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.css']
})
export class GenerateLinkComponent implements OnInit {
  accountCode = '';
  noOfUsers = 1;
  users: any[] = [];
  errorMessage = '';

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.accountCode = this.route.snapshot.paramMap.get('accountCode') || '';
  }

  generateLinks() {
    const token = localStorage.getItem('token');
    if (!token) { this.errorMessage = 'No token found'; return; }

    this.api.generateAssessmentLink("",this.accountCode, this.noOfUsers).subscribe({
      next: (res: any) => this.users = res.UserTable,
      error: () => this.errorMessage = 'Failed to generate links'
    });

  }
}
