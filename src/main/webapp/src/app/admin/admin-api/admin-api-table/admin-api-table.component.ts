import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { EntityMeta, EntityMetaService, ObjectWithLinks, getId } from '@extendz/api';

@Component({
  selector: 'app-admin-api-table',
  templateUrl: './admin-api-table.component.html',
  styleUrls: ['./admin-api-table.component.scss']
})
export class AdminApiTableComponent implements OnInit {
  public entityMeta$: Observable<EntityMeta>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apimodelService: EntityMetaService
  ) {}

  ngOnInit() {
    this.entityMeta$ = this.activatedRoute.params.pipe(
      map(p => p.model),
      flatMap(name => this.apimodelService.getModel(name))
    );
  } // ngOnInit()

  public onSelectEntity(entity: ObjectWithLinks) {
    let id: string = 'new';
    if (entity) {
      id = getId(entity._links.self.href);
    }
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  } // onSelectEntity()
} // class
