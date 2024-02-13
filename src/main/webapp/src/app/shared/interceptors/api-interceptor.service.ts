import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

    private baseUrl: string = environment.basePath;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.startsWith('assets')) {
            return next.handle(req);
        }

        // Skip if base URL contains
        if (req.url.includes(this.baseUrl)) {
            return next.handle(req);
        }

        // Skip if base URL is there
        if (req.url.startsWith(this.baseUrl)) {
            return next.handle(req);
        }

        const apiReq = req.clone({
            url: `${this.baseUrl}${req.url}`
        });

        return next.handle(apiReq);
    } // intercept()

}