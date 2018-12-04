import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { UserService } from 'src/app/profile/services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: [ './order-list.component.scss' ]
})
export class OrderListComponent implements OnInit {
  public openOrders = [];
  public closedOrders = [];
  public cancelledOrders = [];
  public returnedOrders = [];
  public username: any;

  openOrdersColumns: string[] = [ 'order id', 'order date', 'order status', 'card type', 'products', 'cancel' ];
  displayColumns: string[] = [ 'order id', 'order date', 'order status', 'card type', 'products', 'action' ];

  constructor(private ordersService: OrdersService, private userService: UserService) { }

  ngOnInit() {
    const user = this.userService.getActiveUser();
    this.username = user ? user : '';
    this.ordersService.getorders(this.username).then(response => {
      this.openOrders = response.filter(order => order.status === 'open');
      this.closedOrders = response.filter(order => order.status === 'closed');
      this.returnedOrders = response.filter(order => order.status === 'returned');
      this.cancelledOrders = response.filter(order => order.status === 'cancelled');
    }).catch(() => { });
  }

  cancel(id) {
    const cancelledOrder = this.openOrders.find(order => order._id === id);
    cancelledOrder.status = 'cancelled';
    this.ordersService.updateOrder(cancelledOrder).then(response =>{
      this.refreshGrid();
    });
    const orderItems = cancelledOrder.orderItems.map(item => item.name);
    const notification = {
      notificationID: cancelledOrder._id,
      notificationText: 'Order containing ' + orderItems + ' was cancelled successfully',
      isRead: false,
      username: this.username
    };
    this.ordersService.createNotification(notification).then(
      response => { }
    );
  }

  refreshGrid() {
    this.ordersService.getorders(this.username).then(response => {
      this.openOrders = response.filter(order => order.status === 'open');
      this.closedOrders = response.filter(order => order.status === 'closed');
      this.returnedOrders = response.filter(order => order.status === 'returned');
      this.cancelledOrders = response.filter(order => order.status === 'cancelled');
    }).catch(() => { });
  }

}
