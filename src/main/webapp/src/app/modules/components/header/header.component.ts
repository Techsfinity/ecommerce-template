import {Component, Input, OnInit} from '@angular/core';
import {Logout} from "../../../shared/state/auth/auth.actions";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() module : string;

  constructor(private store: Store, private activeRoute: ActivatedRoute, private route: Router) {
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {

    let route = this.route.url;

    if(route) {
      let last = route.substring(route.lastIndexOf("/") + 1, route.length);
      this.module = last
    }

  }

  public logout() {
    this.store.dispatch(new Logout());
  }

}
