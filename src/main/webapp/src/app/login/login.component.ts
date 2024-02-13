import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Credential} from "../shared/models/auth/credential";
import {TokenService} from "../shared/services/token/token.service";
import {AccessTokenResponse} from "../shared/models/auth/access-token-response";
import {catchError, map, tap} from "rxjs/operators";
import {SaveToken} from "../shared/state/auth/auth.actions";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthState} from "../shared/state/auth/auth.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public logged: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private tokenService: TokenService,
              private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

    const token: AccessTokenResponse = this.store.selectSnapshot(AuthState.accessTokenResponse);

    if(token) {

      if(token.expires_at > new Date().getTime()) {
        this.logged = true;
        this.router.navigate(['/home/jobs']);
      } else {
        this.router.navigate(['/']);
      }

    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {

    const credentials: Credential = this.loginFormGroup.value;

    this.tokenService.loginWithCredential(credentials).pipe(
        map((accessToken: AccessTokenResponse) => this.tokenService.getTokenWithExpiredTime(accessToken)),
        //Store token
        tap(accessTokenResponse =>  this.store.dispatch(new SaveToken(accessTokenResponse))),
        catchError(err => {
          this.handleLoginError(err);
          return throwError(err);
        })
    ).subscribe( (accessToken: AccessTokenResponse) => {
      if(accessToken)
        this.router.navigate(['/home/jobs']);
    });

  }// onSubmit()

  /***
   * get the passing error from the login request and handle login accordingly
   *
   * @author Osanda Wedamulla
   * @param exception
   */
  private handleLoginError(exception: any) {

    if(exception && exception.status) {

      if(exception.status > 500) {
        let message = exception.error.error;
        //this.service.openSnackBarMessage(message,'Unauthorized',3000);

      } else {

        if(exception.status === 409) {
          let message = exception.error.error;
          //this.service.openSnackBarMessage(message, 'Close',4000);

        } else if(exception.status === 400) {
          let message = exception.error.error;
          //this.service.openSnackBarMessage(message, 'Close',3000);

        }
      }
    }// exception and status is available
  } // handleLoginError()

}
