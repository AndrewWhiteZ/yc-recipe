import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { TuiDialogService, TuiDialogContext, TuiAlertService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogFormService } from '@taiga-ui/kit';
import { UserService } from '../service/user.service';
import { SignInRequest } from '../domain/sign-in.request';
import { SignUpRequest } from '../domain/sign-up.request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [ TuiDialogFormService ]
})
export class AppComponent implements OnInit {
  public stickyHeader: boolean = false;
  readonly title = 'Рецепты.ру';

  subscription = new Subscription;
  tabIndex = 0;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });

  @HostListener('window:scroll') onScroll() {
    this.stickyHeader = scrollY !== 0;
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly userService: UserService,
    private alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.me();
  }

  get currentUserInfo() {
    return this.userService.currentUserInfo;
  }

  public openLoginForm(content: PolymorpheusContent<TuiDialogContext>) {
    this.subscription = this.dialogs.open(content).subscribe();
  }

  public closeLoginForm() {
    this.signInForm.reset();
    this.signUpForm.reset();
    this.subscription.unsubscribe();
  }

  public signIn() {
    const signInRequest: SignInRequest = {
      username: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    };
    this.userService.signIn(signInRequest).subscribe({
      next: (res) => {
        this.userService.currentUserInfo = res.data;
        this.subscription.unsubscribe();
        this.signInForm.reset();
        this.alerts.open(
          `Авторизован под пользователем <b>${this.userService.currentUserInfo.username}</b>`,
          { label: 'Успех', status: 'success', autoClose: true }
        ).subscribe();
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }

  public signUp() {
    const signUpRequest: SignUpRequest = {
      username: this.signUpForm.controls['username'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
    };
    this.userService.signUp(signUpRequest).subscribe({
      next: (res) => {
        this.userService.currentUserInfo = res.data;
        this.subscription.unsubscribe();
        this.signUpForm.reset();
        this.alerts.open(
          `Пользователь <b>${this.userService.currentUserInfo.username}</b> создан`,
          { label: 'Успех', status: 'success', autoClose: true }
        ).subscribe();
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }

  public me() {
    this.userService.me().subscribe({
      next: (res) => {
        this.userService.currentUserInfo = res.data;
      }
    });
  }

  public logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.userService.currentUserInfo = null,
        this.alerts.open("Успешно деавторизован", { label: 'Успех', status: 'success' }).subscribe();
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }
}
