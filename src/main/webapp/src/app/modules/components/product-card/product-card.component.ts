import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {Image} from "../../models/image";
import {Store} from "@ngxs/store";
import {AuthState} from "../../../shared/state/auth/auth.state";
import {Job} from "../../models/job";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddJobComponent} from "../../dialogs/add-job/add-job.component";
import {Subscription} from "rxjs";
import {AddProductComponent} from "../../dialogs/add-product/add-product.component";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product: Product;

  @Output() delete: EventEmitter<object> = new EventEmitter<object>();

  public images: Image[] = [];
  private readonly accessToken: string;

  private editSubscription: Subscription;

  constructor(private store: Store, private dialog: MatDialog) {
    this.accessToken = this.store.selectSnapshot(AuthState.accessToken);
  }

  ngOnInit() {
    if(this.product) {
      this.product.images.forEach(img => {
        let image = new Image();
        image.url = this.getUrl(img);
        this.images.push(image);
      });
    }
  }

  ngOnDestroy(): void {
    if(this.editSubscription) this.editSubscription.unsubscribe();
  }

  private getUrl(imageName: string): string {
    return this.product._links.self.href + '/' + 'images/' + imageName + '?access_token=' + this.accessToken;
  } // getUrl()

  public editProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();

    product.imageUrls = this.images;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = product;

    this.editSubscription = this.dialog.open(AddProductComponent, dialogConfig).afterClosed().subscribe(value => {
      this.delete.emit(new Object());
    });

  }// editJob()

}