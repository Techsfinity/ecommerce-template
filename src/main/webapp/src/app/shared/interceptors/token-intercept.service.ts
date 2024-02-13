import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { flatMap } from 'rxjs/operators';
import {AuthState} from "../state/auth/auth.state";

@Injectable()
export class TokenInterceptService implements HttpInterceptor {
    constructor(private store: Store) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.startsWith('assets')) {
            return next.handle(request);
        }
        return this.store.select(AuthState.accessToken).pipe(
            flatMap(t => {
                if (t) {
                    const tokenizedRequest = request.clone({
                        headers: request.headers.append('Authorization', 'Bearer ' + t)
                    });
                    return next.handle(tokenizedRequest);
                }
                return next.handle(request);
            })
        );
    } // intercept()
} // TokenInterceptorService {}

