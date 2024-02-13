import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminApiEntityComponent } from './admin-api-entity.component';

const routes: Routes = [{ path: '', component: AdminApiEntityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminApiEntityRoutingModule {}
