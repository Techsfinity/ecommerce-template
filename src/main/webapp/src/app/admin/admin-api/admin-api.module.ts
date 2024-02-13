import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtApiRootModule, ExtApiConfig, EXTENDZ_API_CONFIG } from '@extendz/api';
import { AdminApiRoutingModule } from './admin-api-routing.module';
import { AdminApiComponent } from './admin-api.component';

const apiConfig: ExtApiConfig = {
  svgIconSet: 'assets/svg/api-icons.svg',
  modelsJson: 'assets/json/models.json',
  dataTableProjecion: 'dataTable'
};

@NgModule({
  declarations: [AdminApiComponent],
  imports: [CommonModule, AdminApiRoutingModule, ExtApiRootModule],
  providers: [
    {
      provide: EXTENDZ_API_CONFIG,
      useValue: apiConfig
    }
  ]
})
export class AdminApiModule {}
