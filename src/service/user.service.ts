import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequest } from '../domain/sign-in.request';
import { UserInfo } from '../domain/user.info';
import { Observable } from 'rxjs';
import { SignUpRequest } from '../domain/sign-up.request';
import { TuiAlertService } from '@taiga-ui/core';
import { BaseResponse } from '../domain/base.response';

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
    this.http.post<BaseResponse<UserInfo>>('/api/v1/login', signInRequest).subscribe({
      next: (res) => {
        this.currentUserInfo = res.data;
        this.alerts.open(
          `Авторизован под пользователем <b>${this.currentUserInfo.username}</b>`,
          { label: 'Успех', status: 'success', autoClose: true }
        ).subscribe();
        return res;
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return this.currentUserInfo;
  }

  public signUp(signUpRequest: SignUpRequest): UserInfo | null {
    this.http.post<BaseResponse<UserInfo>>('/api/v1/register', signUpRequest).subscribe({
      next: (res) => {
        this.currentUserInfo = res.data;
        this.alerts.open(
          `Пользователь <b>${this.currentUserInfo.username}</b> создан`,
          { label: 'Успех', status: 'success', autoClose: true }
        ).subscribe();
        return res;
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return this.currentUserInfo;
  }

  public me(): UserInfo | null {
    this.http.get<BaseResponse<UserInfo>>('/api/v1/me').subscribe({
      next: (res) => {
        this.currentUserInfo = res.data;
        return res;
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return this.currentUserInfo;
  }

  public logout(): void {
    this.http.get('/api/v1/logout').subscribe({
      next: () => {
        this.currentUserInfo = null,
        this.alerts.open("Успешно деавторизован", { label: 'Успех', status: 'success' }).subscribe();
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }
  
}
