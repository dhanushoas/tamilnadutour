import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { URL } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private baseUrl = 'http://localhost:3000';

   private baseUrl=URL.prodUrl;

  constructor(private http: HttpClient) {}

  checkIfEmailExists(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/check-email`, { gmailId: email });
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error);
      })
    );
  }

  loginUser(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, user);
  }

  private loggedInUserSubject = new BehaviorSubject<string | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  // Add the signedInUsername$ property
  signedInUsername$ = this.loggedInUserSubject.asObservable();

  setLoggedInUser(username: string | null) {
    this.loggedInUserSubject.next(username);
    if (username !== null) {
      localStorage.setItem('loggedInUser', username);
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  signOut(): void {
    window.location.reload();
    this.setLoggedInUser(null);
  }
}
