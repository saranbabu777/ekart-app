import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule, MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    ProductsRoutingModule
  ]
})

export class ProductsModule { }
