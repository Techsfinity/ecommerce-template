import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {

    this.iconRegistry.addSvgIconSetInNamespace(
        'admin',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/svg/admin.svg')
    );
  }

  ngOnInit() {
  }

}// HomeComponent()
