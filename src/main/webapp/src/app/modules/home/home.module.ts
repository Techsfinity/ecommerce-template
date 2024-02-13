import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HeaderComponent} from "../components/header/header.component";
import {HomeComponent} from "./home.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTooltipModule} from "@angular/material/tooltip";
import {UserGuardService} from "./user-guard.service";

@NgModule({
    declarations: [HomeComponent, HeaderComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        FlexLayoutModule,
        MatTooltipModule
    ],
    providers: [UserGuardService]
})
export class HomeModule { }
