import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatRadioModule, MatChipsModule, MatFormFieldModule } from '@angular/material';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { ItemComponent } from './item/item.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [ ItemComponent, FavoritesComponent ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
  ]
})
export class WishlistModule { }
