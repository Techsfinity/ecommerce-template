import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMENT_ENDPOINT, HomeService} from "../../home/home.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BasicModel} from "../../models/basic-model";
import {Category} from "../../models/category";
import {Product} from "../../models/product";
import {Subscription} from "rxjs";
import {JobSave} from "../../models/job-save";
import {DatePipe} from "@angular/common";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {flatMap, take} from "rxjs/operators";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {Job} from "../../models/job";
import {SelectProduct} from "../../models/select-product";
import {Store} from "@ngxs/store";
import {AuthState} from "../../../shared/state/auth/auth.state";
import {DecodedJwt, decodeJwt} from "../../../shared/models/auth/decoded-jwt";
import {Comment} from "../../models/comment";

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddJobComponent implements OnInit, OnDestroy {

  public jobFormGroup: FormGroup;

  public jobTypes: BasicModel[];
  public categories: Category[];
  public products: Product[];
  public jobStatues: BasicModel[];

  private productSearchSub$: Subscription;
  private calculateTotal$: Subscription;
  public minDate = new Date();

  public total: number = 0;

  public userName: string;

  constructor(
      private dialogRef: MatDialogRef<AddJobComponent>,
      private homeService: HomeService,
      private fb: FormBuilder,
      private datePipe: DatePipe,
      private snackBarService: SnackBarService,
      @Inject(MAT_DIALOG_DATA) public job: Job,
      private store: Store) {

    this.jobFormGroup = this.fb.group({
      jobType: [null, Validators.required],
      status: [null],
      endDate: [],

      name: [null],
      customerName: [null, Validators.required],
      customerPhone: [null, Validators.required],
      comment: [null],

      products: this.fb.array([]),

      remarks: [null],
      extraCost: [0],
      extraCostName: [null],
      advance: [null]

    });

    if (this.job) {

      let date = this.datePipe.transform(this.job.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

      this.jobFormGroup.patchValue({
        name: this.job.name,
        jobType: this.job.type,
        endDate: date,
        customerName: this.job.customer ? this.job.customer.name : null,
        customerPhone: this.job.customer ? this.job.customer.phone : null,
        remarks: this.job.remarks,
        extraCost: this.job.extraCost,
        extraCostName: this.job.extraCostName,
        advance: this.job.advance,
      });

      this.total = this.job.total;

      this.homeService.getAllJobStatuses().subscribe(response => {
        this.jobStatues = response;
      });

    }// end job details populating

  }

  ngOnInit() {

    this.homeService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      categories.forEach(cat => { this.productsArray.push(this.newProduct()) });

      //patch product value if job present
      if (this.job) {
        const selectedItems: SelectProduct[] = this.job.selectProducts;

        selectedItems.forEach(sp => {
          const index: number = this.categories.findIndex(cat => cat.name === sp.product.category);
          if (index != undefined) {
            this.productsArray.at(index).patchValue({
              name: sp.product.name,
              quantity: sp.quantity,
              unitPrice: sp.product.price,
              unit: sp.product.unit
            });
          }
        });
      }

    });

    this.homeService.getAllJobTypes().subscribe(types => {
      this.jobTypes = types;
    });

    this.getTotal();
    this.getUserInformationFromToken();

  }// ngOnInit()

  private getUserInformationFromToken() {
    const token = this.store.selectSnapshot(AuthState.accessToken);
    const decode: DecodedJwt = decodeJwt(token);

    this.userName = decode.sub;
  }// getUserInformationFromToken()

  ngOnDestroy(): void {
    if (this.productSearchSub$) this.productSearchSub$.unsubscribe();
    if (this.calculateTotal$) this.calculateTotal$.unsubscribe()
  }// ngOnDestroy()

  public searchProducts(event: KeyboardEvent, categoryName: string) {

    if (event) {
      const productName: string = (event.target as HTMLInputElement).value;

      if (productName && productName != '' && productName.length > 2) {
        this.homeService.getProductsByNameAndCategoryName(categoryName, productName).subscribe(products => {
          this.products = products;
        });
      } else if (productName == '') {
        this.homeService.getProductsByNameAndCategoryName(categoryName).subscribe(products => {
          this.products = products;
        })
      }
    }

  }// productSearchFromController()

  public close() {
    this.dialogRef.close();
  }// close()

  public onAddJob() {

    const job: JobSave = this.jobFormGroup.getRawValue();
    job.subTotal = this.total;

    this.homeService.saveJob(job).subscribe((value: any) => {
      if (value) {
        this.dialogRef.close(value);
        this.snackBarService.createSnackBarMessage(value.message, 'CLOSE', 4000);
      }
    });

  }// onAddJob()

  get productsArray(): FormArray {
    return this.jobFormGroup.get("products") as FormArray;
  }// productsArray()

  public newProduct(): FormGroup {
    return this.fb.group({
      name: [null],
      quantity: [null],
      unitPrice: [null],
      unit: [null]
    })
  }// newProduct()

  public onCategoryClick(category: any) {
    this.products = [];
    this.homeService.getProductsByCategoryName(category).subscribe(products => {
      this.products = products;
    });
  }// onCategoryClick()

  public onCategoryClose() {
    setTimeout(function () { this.products = []; }, 5);
  }// onCategoryClose()

  public addPrice(index: number, value: number) {
    this.productsArray.at(index).patchValue({ unitPrice: value });
    this.products = [];
  }// addPrice()

  private getTotal() {
    this.calculateTotal$ = this.jobFormGroup.controls['products'].valueChanges.subscribe((products: Product[]) => {
      this.total = 0;
      products.filter(p => p.quantity).forEach(p => {
        this.total = this.total + (p.unitPrice * p.quantity);
      });
    });
  }// getTotal()

  /***
   * job update details starts
   *
   * @author Osanda Wedamulla
   */

  public updateJobDetails() {

    const job: JobSave = this.jobFormGroup.getRawValue();
    job.subTotal = this.total;
    job.id = this.job.id;

    this.homeService.updateJobDetails(job).subscribe((value: any) => {
      console.log('JOB', value);
      if (value) {
        //this.dialogRef.close(value);
        this.snackBarService.createSnackBarMessage(value.message, 'CLOSE', 4000);
      }
    });

  }// updateJobDetails()

  public changeJobStatus(status: BasicModel) {

    let patchJob: Job = this.getSaveJobWithSelf();
    patchJob.status = status._links.self.href;

    if (status._links.self.href && this.job._links.self.href) {
      this.homeService.rest.patchEntity(patchJob).pipe(take(1)).subscribe(response => {
        this.job.status = status.name;
      });
    }

  }// changeJobStatus()

  private getSaveJobWithSelf(): JobSave {
    let patchJob: Job = new Job();
    patchJob['_links'] = {};
    patchJob['_links']['self'] = { href: this.job._links.self.href };

    return patchJob;
  }// getSaveJobWithSelf()

  public addComment() {
    const text = this.jobFormGroup.get('comment').value;

    let patchJob: Job = this.getSaveJobWithSelf();

    let comment: Comment = new Comment();
    comment.description = text;
    comment.userName = this.userName;

    patchJob.comments = [];

    this.homeService.rest.post(COMMENT_ENDPOINT, comment).pipe(
      take(1),
      flatMap((res: Comment) => {
        this.job.comments.push(res);
        patchJob.comments.push(res._links.self.href);
        let url = patchJob._links.self.href + '/' + COMMENT_ENDPOINT;
        return this.homeService.rest.patchList(url, res._links.self.href).pipe(take(1));
      })
    ).subscribe();

  }// addComment()

}// AddJobComponent {}
