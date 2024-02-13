import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddJobComponent} from "../dialogs/add-job/add-job.component";
import {HateosPagedResponse, Page} from "../../shared/services/rest/models";
import {HomeService, JOB_ENDPOINT} from "../home/home.service";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Job} from "../models/job";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {

  public page: Page;
  public jobs: Job[];

  public jobCardOpenSubscription: Subscription;

  constructor(private dialog: MatDialog,
              private service: HomeService,) { }

  ngOnInit() {
    this.getAllJobs();
  }
  ngOnDestroy(): void {
    if(this.jobCardOpenSubscription) this.jobCardOpenSubscription.unsubscribe();
  }

  public openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = undefined;
    dialogConfig.width = '1200px';

    this.dialog.open(AddJobComponent, dialogConfig).afterClosed().subscribe(value => {
      if(value) {
        this.getAllJobs();
      }
    });

  }// openDialog()

  private getAllJobs(page?: number, size?: number) {
    this.service.getAllJobs(page, size).subscribe( (response: HateosPagedResponse<Object>) => {
      this.jobs = response._embedded[JOB_ENDPOINT];
      this.page = response.page;
      console.log('JOBS ', this.jobs);
    });

  }// getAllJobs()

  public onPageClick(event:PageEvent) {
    this.getAllJobs(event.pageIndex, event.pageSize);
  }// onPageClick()

  public afterJobDelete(event: any) {
    if(event)
      this.getAllJobs();
  }// afterJobDelete()

}// JobComponent()
