import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from "@ngxs/store";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsResetPluginModule} from "ngxs-reset-plugin";
import {environment} from "../environments/environment";
import {AppState} from "./shared/state/app/app.state";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptService} from "./shared/interceptors/token-intercept.service";
import {TokenExpiredInterceptor} from "./shared/interceptors/token-expired-interceptor.service";
import {ApiInterceptorService} from "./shared/interceptors/api-interceptor.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

    NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot(),
    NgxsResetPluginModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenExpiredInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
