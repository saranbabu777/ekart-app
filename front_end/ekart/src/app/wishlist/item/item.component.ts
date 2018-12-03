import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../cart/services/cart.service';
import { UserService } from '../../profile/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.scss' ]
})
export class ItemComponent implements OnInit {

  @Input() public product;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  public activeUser: string;

  constructor(private cartService: CartService, private userService: UserService) {
    this.activeUser = this.userService.getActiveUser();
  }

  ngOnInit() {
  }

  moveToCart() {
    const data = {
      qty: 1,
      username: this.activeUser,
      productId: this.product.pid
    }
    this.cartService.add(data).then(response => {
      this.removeItem();
      console.log('item added to cart successfully ', response)
    });
  }

  removeItem() {
    this.remove.emit(this.product.pid);
  }

  calcPrice(rate, discount) {
    return (rate - (rate * (discount / 100)));
  }
}
