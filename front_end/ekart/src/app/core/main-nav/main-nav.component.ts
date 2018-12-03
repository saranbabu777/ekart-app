import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/services/cart.service';
import { UserService } from '../../profile/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: [ './main-nav.component.scss' ]
})
export class MainNavComponent implements OnInit, OnDestroy {

  public cartCount: number;
  public isLoggedIn: boolean;
  private subscription: Subscription;

  constructor(private cartService: CartService, private userService: UserService) {
    this.userService.loggedIn().subscribe(response => {
      this.isLoggedIn = response;
    })
    const activeUser = this.userService.getActiveUser();
    this.cartService.fetchCartCount(activeUser);
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }
}
