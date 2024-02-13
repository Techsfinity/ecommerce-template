import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import {HomeRoutingModule} from "../home/home-routing.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AddJobComponent} from "../dialogs/add-job/add-job.component";
import {JobCardComponent} from "../components/job-card/job-card.component";
import {DeleteConfirmComponent} from "../../shared/components/delete-confirm/delete-confirm.component";
import {HomeService} from "../home/home.service";
import {RestService} from "../../shared/services/rest/rest.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from "@angular/material-moment-adapter";


@NgModule({
  declarations: [JobComponent, AddJobComponent, JobCardComponent, DeleteConfirmComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  entryComponents: [AddJobComponent, DeleteConfirmComponent],
  providers: [
    HomeService,
    RestService,
    DatePipe,
    SnackBarService,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DIALOG_DATA, useValue: undefined}
  ]
})
export class JobModule { }
