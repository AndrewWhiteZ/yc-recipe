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

  public signIn(signInRequest: SignInRequest): Observable<BaseResponse<UserInfo>> {
    return this.http.post<BaseResponse<UserInfo>>('/api/v1/login', signInRequest);
  }

  public signUp(signUpRequest: SignUpRequest): Observable<BaseResponse<UserInfo>> {
    return this.http.post<BaseResponse<UserInfo>>('/api/v1/register', signUpRequest);
  }

  public me(): Observable<BaseResponse<UserInfo>> {
    return this.http.get<BaseResponse<UserInfo>>('/api/v1/me');
  }

  public logout(): Observable<BaseResponse<null>> {
    return this.http.get<BaseResponse<null>>('/api/v1/logout');
  }
  
}
