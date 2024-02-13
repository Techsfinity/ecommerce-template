import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";
import {UserGuardService} from "./user-guard.service";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      {
        path: 'jobs',
        loadChildren: () => import('../../modules/job/job.module').then(m => m.JobModule),
        canActivate: [UserGuardService],
      },
      {
        path: 'products',
        loadChildren: () => import('../../modules/products/products.module').then(m => m.ProductsModule),
        canActivate: [UserGuardService],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
