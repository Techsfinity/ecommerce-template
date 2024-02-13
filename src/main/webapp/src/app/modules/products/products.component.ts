import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddProductComponent } from '../dialogs/add-product/add-product.component';
import {HomeService, PRODUCT_ENDPOINT} from "../home/home.service";
import {HateosPagedResponse, Page} from "../../shared/services/rest/models";
import {Product} from "../models/product";
import {PageEvent} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: Product[];
  public page: Page;

  private productOpenSub: Subscription;

  constructor(private dialog: MatDialog,
              private homeService: HomeService) { }


  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productOpenSub) this.productOpenSub.unsubscribe();
  }

  public openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddProductComponent, dialogConfig).afterClosed().subscribe(value => {
      this.getProducts();
    });
  }// openDialog()

  private getProducts(page?:number, size?:number) {
    this.homeService.getAllProducts(page, size).subscribe( (response: HateosPagedResponse<Object>) => {
      this.products = response._embedded[PRODUCT_ENDPOINT];
      this.page = response.page;
    });
  }// getProducts()

  public onPageClick(event:PageEvent) {
    this.getProducts(event.pageIndex, event.pageSize);
  }// onPageClick()

  public onProductChange() {
    this.getProducts();
  }// onProductChange()

// onPageClick()
}
