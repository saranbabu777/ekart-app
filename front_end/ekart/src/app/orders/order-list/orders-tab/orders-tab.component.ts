import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { UserService } from 'src/app/profile/services/user.service';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: [ './orders-tab.component.scss' ]
})
export class OrdersTabComponent implements OnInit {

  @Input() dataSource: any;
  @Input() displayColumns: any;
  @Output() refreshGrid: EventEmitter<any> = new EventEmitter<any>();
  public username: string;

  constructor(private ordersService: OrdersService, private userService: UserService) { }

  ngOnInit() {
    const user = this.userService.getActiveUser();
    this.username = user ? user : '';
  }

  return(i) {
    const returnedOrder = this.dataSource[ i ];
    returnedOrder.status = 'returned';
    this.ordersService.updateOrder(returnedOrder).then(response => {
      this.refreshGrid.emit();
    });
    // this.refreshGrid.emit();
    const orderItems = returnedOrder.orderItems.map(item => item.name);
    const notification = {
      notificationID: returnedOrder._id,
      notificationText: 'Order containing ' + orderItems + ' was returned successfully',
      isRead: false,
      username: this.username
    };
    this.ordersService.createNotification(notification).then(
      response => { }
    );
  }

}
