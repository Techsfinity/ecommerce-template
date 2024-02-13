import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngxs/store';
import {Logout} from "../shared/state/auth/auth.actions";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store
  ) {
    this.iconRegistry.addSvgIconSetInNamespace(
      'admin',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/svg/admin.svg')
    );
  } // constructor

  ngOnInit() {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
