import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatCardModule, MatIconModule } from '@angular/material';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';

@NgModule({
  declarations: [ NotificationsListComponent ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
