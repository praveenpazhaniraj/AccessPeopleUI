import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44311/api/AssessPeople';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  authenticate(clientId: string, clientSecret: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, {
      client_id: clientId,
      client_secret: clientSecret,
    });
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenValid(token: string): boolean {
    // Simple check: token exists; for more secure, backend validation needed
    return token && token.length > 0 ? true : false;
  }

  fetchAssessmentTests(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/FetchAssessmentTests`, { headers });
  }

  generateAssessmentLink(token: string, accountCode: string, noOfUsers: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      `${this.baseUrl}/GenerateAssessmentLink`,
      { Accountcode: accountCode, NoofUsers: noOfUsers },
      { headers }
    );
  }
}
