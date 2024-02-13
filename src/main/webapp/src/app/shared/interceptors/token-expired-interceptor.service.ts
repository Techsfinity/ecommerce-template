import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Logout} from "../state/auth/auth.actions";

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

    constructor(private router: Router, private store: Store) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).pipe(
            catchError((e: HttpErrorResponse) => {
                if (e.status === 401) {
                    this.store.dispatch(new Logout());
                    return of(e.message);
                }
                return throwError(e);
            })
        );
    } // intercept()

}