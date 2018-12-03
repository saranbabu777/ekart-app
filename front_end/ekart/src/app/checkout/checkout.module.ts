import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatRadioModule, MatChipsModule, MatFormFieldModule, MatSelectModule, MatStepperModule } from '@angular/material';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressFormComponent } from './address-list/address-form/address-form.component';
import { AddressComponent } from './address-list/address/address.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardFormComponent } from './card-list/card-form/card-form.component';
import { CardComponent } from './card-list/card/card.component';
import { MessagesComponent } from '../core/messages/messages.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    AddressListComponent,
    AddressFormComponent,
    AddressComponent,
    CardListComponent,
    CardFormComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatStepperModule,
    CoreModule,
    CheckoutRoutingModule
  ],
  entryComponents: [ MessagesComponent ]
})
export class CheckoutModule { }
