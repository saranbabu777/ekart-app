import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';

import { CartRoutingModule } from './cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemComponent } from './item/item.component';
import { MessagesComponent } from '../core/messages/messages.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CartRoutingModule
  ],
  entryComponents: [ MessagesComponent ]
})
export class CartModule { }
