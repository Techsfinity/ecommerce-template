import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {ProductCardComponent} from "../components/product-card/product-card.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from "@angular/material/select";
import {AddProductComponent} from "../dialogs/add-product/add-product.component";
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {HomeService} from "../home/home.service";
import {RestService} from "../../shared/services/rest/rest.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FileUploadService} from "../../shared/services/file-upload/file-upload.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [ProductsComponent, AddProductComponent, ProductCardComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [HomeService, RestService, FileUploadService, SnackBarService],
  entryComponents: [AddProductComponent]
})
export class ProductsModule { }
