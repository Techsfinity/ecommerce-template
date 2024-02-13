import {NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Logout, SaveToken, SaveUserModules} from './auth.actions';
import {StateClear} from "ngxs-reset-plugin";
import {Module} from "../../models/module";
import {AccessTokenResponse} from "../../models/auth/access-token-response";
import {decodeJwt} from "../../models/auth/decoded-jwt";

interface AuthStateModel {
    accessTokenResponse?: AccessTokenResponse;
    roles?: string[];
    userModules?: Module[];
}

@State<AuthStateModel>({
    name: 'auth'
})
export class AuthState {

    constructor(
        private ngZone: NgZone,
        private store: Store,
        private router: Router
    ) {}

    @Selector()
    static roles(state: AuthStateModel): string[] {
        return state.roles;
    }

    @Selector()
    static userModules(state: AuthStateModel): Module[] {
        return state.userModules;
    }

    @Selector()
    static accessToken(state: AuthStateModel): string {
        return state.accessTokenResponse.access_token;
    }

    @Selector()
    static accessTokenResponse(state: AuthStateModel): AccessTokenResponse {
        return state.accessTokenResponse;
    }

    @Action(Logout)
    public logout() {
        this.store.dispatch(new StateClear());
        this.ngZone.run(()=>{
            this.router.navigate(['/']);
        });
    } //logout()

    @Action(SaveToken)
    public saveTokenAndRoles({patchState}: StateContext<AuthStateModel>, action: SaveToken) {

        const token: AccessTokenResponse = action.payload;
        // Store token
        patchState({accessTokenResponse: token});
        // store roles
        const tk = decodeJwt(token.access_token);
        const roles: string[] = tk.scopes.split(',');

        patchState({roles});
    }//aveTokenAndRoles()

    @Action(SaveUserModules)
    public saveUserModules({patchState}: StateContext<AuthStateModel>, action: SaveUserModules) {
        const userModules = action.payload;
        patchState({userModules});
    }// saveUserModules()

} // AuthState class