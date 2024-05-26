import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequest } from '../domain/sign-in.request';
import { UserInfo } from '../domain/user.info';
import { Observable } from 'rxjs';
import { SignUpRequest } from '../domain/sign-up.request';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  currentUserInfo: UserInfo | null = null;

  constructor(
    private http: HttpClient,
    private alerts: TuiAlertService,
  ) {}

  public signIn(signInRequest: SignInRequest): UserInfo | null {
    this.http.post<UserInfo>('localhost:8080/api/v1/login', signInRequest).subscribe({
      next: (res) => { this.currentUserInfo = res; return res },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return this.currentUserInfo;
  }

  public signUp(signUpRequest: SignUpRequest): UserInfo | null {
    this.http.post<UserInfo>('localhost:8080/api/v1/register', signUpRequest).subscribe({
      next: (res) => { this.currentUserInfo = res; return res },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return this.currentUserInfo;
  }

  public me(): UserInfo | null {
    this.http.get<UserInfo>('localhost:8080/api/v1/me').subscribe({
      next: (res) => { this.currentUserInfo = res; return res },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return this.currentUserInfo;
  }

  public logout(): void {
    this.http.get('localhost:8080/api/v1/logout').subscribe({
      next: () => this.currentUserInfo = null,
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }
  
}
