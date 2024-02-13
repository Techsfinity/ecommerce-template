import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngxs/store";
import {AccessTokenResponse} from "../../models/auth/access-token-response";
import {DecodedJwt, decodeJwt} from "../../models/auth/decoded-jwt";
import {AuthState} from "../../state/auth/auth.state";
import {Credential} from "../../models/auth/credential";
import {RestService} from "../rest/rest.service";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";

export const LOGIN_URL: string = 'login/token';

@Injectable()
export class TokenService {

  constructor(private rest: RestService, private store: Store) { }

  public loginWithCredential(credential: Credential): Observable<Object> {

    return this.rest.post(LOGIN_URL, credential).pipe(take(1));
  }// loginWithCredential()

  public hasValidToken(): boolean {
    let token = this.getToken();
    if (token && token.expires_in && token.expires_in > new Date().getTime()) {
      return true;
    }
    return false;
  } //  hasValidToken()

  public getToken(): AccessTokenResponse {
    return this.store.selectSnapshot(AuthState.accessTokenResponse);
  }

  /**
   * get decoded jwt token form access token
   *
   * @author Osanda Wedamulla
   * @return DecodedJwt
   */
  public getDecodedJWTToken(): DecodedJwt {
    const token = this.store.selectSnapshot(AuthState.accessToken);
    return decodeJwt(token);
  } // getDecodedJWTToken()

  public getTokenWithExpiredTime(accessToken: AccessTokenResponse): AccessTokenResponse {
    // Add the current time to calculate the time
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + accessToken.expires_in);
    let token: AccessTokenResponse = accessToken;
    token.expires_at = expiredAt.getTime();
    //accessToken.expires_in = expiredAt.getTime();
    return token;
  } //  saveToken()
}
