import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityMeta} from '@extendz/api';

@Component({
  selector: 'app-admin-api',
  templateUrl: './admin-api.component.html',
  styleUrls: ['./admin-api.component.scss']
})
export class AdminApiComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  public onSelect(model: EntityMeta) {
    this.router.navigate([model.name], { relativeTo: this.activeRoute });
  } // onSelect()
} // class
