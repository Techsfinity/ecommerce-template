import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtApiItemModule } from '@extendz/api';
import { AdminApiEntityRoutingModule } from './admin-api-entity-routing.module';
import { AdminApiEntityComponent } from './admin-api-entity.component';

@NgModule({
  declarations: [AdminApiEntityComponent],
  imports: [
    CommonModule,
    AdminApiEntityRoutingModule,
    // Ext
    ExtApiItemModule
  ]
})
export class AdminApiEntityModule {}
