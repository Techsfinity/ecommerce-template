import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminApiTableComponent } from './admin-api-table.component';

const routes: Routes = [{ path: '', component: AdminApiTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminApiTableRoutingModule {}
