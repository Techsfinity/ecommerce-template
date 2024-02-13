import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityMetaService, EntityMeta, getId, ObjectWithLinks } from '@extendz/api';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-api-entity',
  templateUrl: './admin-api-entity.component.html',
  styleUrls: ['./admin-api-entity.component.scss']
})
export class AdminApiEntityComponent {
  public entityMeta: EntityMeta;
  public entity$: Observable<ObjectWithLinks>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apimodelService: EntityMetaService,

    private http: HttpClient,
    private changeDedectionRef: ChangeDetectorRef
  ) {
    this.entity$ = this.activatedRoute.params.pipe(
      flatMap(prams => {
        let x = this.apimodelService.getModel(prams.model).pipe(tap(m => (this.entityMeta = m)));
        // If id null then do not call the API for data just show a new form to add data
        if (prams.id == 'new') return x.pipe(map(() => null));
        return x.pipe(flatMap(meta => this.http.get<ObjectWithLinks>(`${meta.url}/${prams.id}`)));
      })
    );
  }

  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }

  public onBack() {
    this.router.navigate([this.getRelativePath()], { replaceUrl: true });
  }

  public onSave(url: string) {
    let path = this.getRelativePath();
    let id = getId(url);
    this.router.navigate([path, id], { replaceUrl: true });
  }

  private getRelativePath(): string {
    return this.router.url.substring(0, this.router.url.lastIndexOf('/') + 1);
  }
} // class
