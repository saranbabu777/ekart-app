import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { MatMenuModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDialogModule } from '@angular/material';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainNavComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [ LayoutComponent, MessagesComponent ]
})
export class CoreModule { }
