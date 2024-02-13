import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {RestService} from "../shared/services/rest/rest.service";
import {AdminGuardService} from "./admin-guard.service";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [AdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FlexLayoutModule,
        // Mat
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule
    ],
  providers:[RestService, AdminGuardService]
})
export class AdminModule {}
