import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'api',
        loadChildren: () => import('./admin-api/admin-api.module').then(m => m.AdminApiModule),
        canActivate: [AdminGuardService],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
