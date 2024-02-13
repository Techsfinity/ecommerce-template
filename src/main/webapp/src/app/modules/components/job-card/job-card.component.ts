import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Job} from "../../models/job";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddJobComponent} from "../../dialogs/add-job/add-job.component";
import {of, Subscription} from "rxjs";
import {RestService} from "../../../shared/services/rest/rest.service";
import {DeleteConfirmComponent} from "../../../shared/components/delete-confirm/delete-confirm.component";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit, OnDestroy {

  @Input() job: Job;
  @Output() delete: EventEmitter<object> = new EventEmitter<object>();

  private editSubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(private dialog: MatDialog, private rest: RestService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    if(this.editSubscription) this.editSubscription.unsubscribe();
    if(this.deleteSubscription) this.deleteSubscription.unsubscribe();
  }

  public editJob(job: Job) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = job;

    this.editSubscription = this.dialog.open(AddJobComponent, dialogConfig).afterClosed().subscribe(value => {
      this.delete.emit(new Object());
    });

  }// editJob()

  public deleteJob(job: Job) {

    const deleteConfig = new MatDialogConfig();

    deleteConfig.disableClose = true;
    deleteConfig.autoFocus = true;
    deleteConfig.width = '450px';

    this.deleteSubscription = this.dialog.open(DeleteConfirmComponent, deleteConfig).afterClosed().subscribe(response => {

      if(response && job._links.self.href) {
        this.rest.delete(job._links.self.href).pipe(take(1)).subscribe(value => {
          this.delete.emit(new Object());
        });
      }

    });

  }// deleteJob()

}
