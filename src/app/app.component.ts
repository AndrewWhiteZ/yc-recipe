import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
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
export class AppComponent {
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
  ) {}

  get currentUserInfo() {
    return !this.userService.currentUserInfo;
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
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    };
    this.userService.signIn(signInRequest);
  }

  public signUp() {
    const signUpRequest: SignUpRequest = {
      username: this.signInForm.controls['username'].value,
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    };
    this.userService.signUp(signUpRequest);
  }

  public logout() {
    this.userService.logout();
  }
}
