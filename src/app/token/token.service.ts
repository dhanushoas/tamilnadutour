import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private verified = false;
  private requestedRoute: string = '';
  private apiUrl = 'http://localhost:3000/token'; // Update the API endpoint URL if needed

  constructor(private http: HttpClient) { } // Inject the HttpClient service

  verifyToken(token: string): boolean {
    this.verified = token.trim() !== '';
    return this.verified;
  }

  setRequestedRoute(route: string): void {
    this.requestedRoute = route;
  }

  getRequestedRoute(): string {
    return this.requestedRoute;
  }

  isAuthenticated(): boolean {
    return this.verified;
  }

  verifySecretKey(secretKey: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { secretKey });
  }

  setVerified(status: boolean): void {
    this.verified = status;
  }
}
