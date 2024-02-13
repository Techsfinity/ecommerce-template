import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "../../home/home.service";
import {Category} from "../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product";
import {Subscription} from "rxjs";
import {FileUploadService} from "../../../shared/services/file-upload/file-upload.service";
import {HttpEventType} from "@angular/common/http";
import {take} from "rxjs/operators";
import {SnackBarService} from "../../../shared/services/snack-bar.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public productFormGroup: FormGroup;

  public categories: Category[];

  public uploadSubscription: Subscription;

  public fileUploadProgress: string = null;

  public selectedFiles: File[] = [];
  public imagesUrls: any[] = [];

  constructor(
      private dialogRef: MatDialogRef<AddProductComponent>,
      private homeService: HomeService,
      private fb: FormBuilder,
      private uploadService: FileUploadService,
      private snackBarService: SnackBarService,
      @Inject(MAT_DIALOG_DATA) public product: Product) {

    this.productFormGroup = this.fb.group({
      name: [null, Validators.required],
      code: [null],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      description: [null],
      category: [null, Validators.required],
      unit: []
    });
    
  }

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy(): void {
    if(this.uploadSubscription) this.uploadSubscription.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  private getCategories() {
    this.homeService.getAllCategories().subscribe(categories => {

      this.categories = categories;

      //if product avialable patch the exitsing values
      if(this.product) {

        const cat: Category[] = this.categories.filter(c => c.name == this.product.category);

        this.productFormGroup.patchValue({
          name: this.product.name,
          code: this.product.code,
          quantity: this.product.quantity,
          description: this.product.description,
          price: this.product.price,
          category: cat[0],
          unit: this.product.unit,
        });

        this.product.imageUrls.forEach(url => this.imagesUrls.push(url.url));
      }

    });
  }// getCategories{}

  public createProduct() {
    let product: Product = this.productFormGroup.value;

    const category: Category = this.productFormGroup.get('category').value;
    product.category = category._links.self.href;

    this.homeService.createNewProduct(product).subscribe( (product: Product) => {
      const newProduct = product;

      if(product._links) {
        const id = this.homeService.rest.getIdFromSelf(product._links.self.href);
        newProduct.id = id;
        this.product = newProduct;
        this.uploadProductImages(id, product);
      }
    });

  }// createProduct()

  public getSelectedFiles(fileInput: any) {

    for(let i=0; i < fileInput.target.files.length; i++) {
      const index = this.selectedFiles.indexOf(fileInput.target.files[i]);
      if(index < 0)
        this.selectedFiles.push(fileInput.target.files[i]);
    }
    this.preview(this.selectedFiles);

  }// getSelectedFiles()

  public uploadProductImages(productId: string, product: Product) {

    const uploadEndpoint = 'products/' + productId + '/images';

    if(this.selectedFiles.length > 0) {

      this.uploadSubscription = this.uploadService.uploadMultipleFileToCustomEndPoint(this.selectedFiles, uploadEndpoint,'images').subscribe((events: any) => {

        if(events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        } else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
        }

        if(events.body) {
          const images = events.body;
          product.images = images;
          this.homeService.rest.patchEntity(product).pipe(take(1)).subscribe(value => {
            const message = 'Product updated with images Id : ' + productId;
            this.snackBarService.createSnackBarMessage(message, 'Done', 3000);
          });
        }

      });
    } else {
      const message = 'Product created Id : ' + productId;
      this.snackBarService.createSnackBarMessage(message, 'Done', 3000);
    }

  }// uploadProductImages()

  public preview(files: File[]) {
    this.imagesUrls = [];
    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    files.forEach(f => {
      let reader = new FileReader();

      reader.readAsDataURL(f);
      reader.onload = (_event) => {
        this.imagesUrls.push(reader.result);
      }
    });

  }// preview()

  public updateProduct() {

    let product: Product = this.productFormGroup.value;

    const category: Category = this.productFormGroup.get('category').value;
    product.category = category._links.self.href;

    product['_links'] = {};
    product['_links']['self'] = { href: this.product._links.self.href };

    this.homeService.rest.patchEntity(product).pipe(take(1)).subscribe( (product: Product) => {

      if(product._links) {
        const id = this.homeService.rest.getIdFromSelf(product._links.self.href);
        const message = 'Product details updated. ID : ' + id;
        this.snackBarService.createSnackBarMessage(message, 'Done', 3000);
        this.uploadProductImages(id, product);
      }

    });

  }// updateProduct()

}
