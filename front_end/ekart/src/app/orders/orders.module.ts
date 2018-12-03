import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatTableModule, MatButtonModule } from '@angular/material';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersTabComponent } from './order-list/orders-tab/orders-tab.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrdersTabComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
