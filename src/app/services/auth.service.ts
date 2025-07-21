import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token_jf_foundation_2345';
  // Dummy credentials:
  private readonly VALID_USER = 'admin123';
  private readonly VALID_PASS = 'password123';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.VALID_USER && password === this.VALID_PASS) {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.TOKEN_KEY, 'dummy-jwt-token');
      }
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(this.TOKEN_KEY);
      this.router.navigate(['/home']);

    }
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    return !!window.localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return window.localStorage.getItem(this.TOKEN_KEY);
  }
}
