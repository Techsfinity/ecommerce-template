import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EntityMetaService, ExtApiTableModule } from '@extendz/api';
import { AdminApiTableRoutingModule } from './admin-api-table-routing.module';
import { AdminApiTableComponent } from './admin-api-table.component';

@NgModule({
  declarations: [AdminApiTableComponent],
  imports: [
    CommonModule,
    AdminApiTableRoutingModule,
    //
    ExtApiTableModule,
    // Mat
    MatIconModule,
    MatButtonModule
  ],
  providers: [EntityMetaService]
})
export class AdminApiTableModule {}
