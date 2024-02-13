import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminApiComponent } from './admin-api.component';

const routes: Routes = [
  { path: '', component: AdminApiComponent },
  {
    path: ':model',
    loadChildren: () =>
      import('./admin-api-table/admin-api-table.module').then(m => m.AdminApiTableModule)
  },
  {
    path: ':model/:id',
    loadChildren: () =>
      import('./admin-api-entity/admin-api-entity.module').then(m => m.AdminApiEntityModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminApiRoutingModule {}
