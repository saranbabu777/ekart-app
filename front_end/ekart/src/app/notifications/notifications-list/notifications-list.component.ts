import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { UserService } from 'src/app/profile/services/user.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: [ './notifications-list.component.scss' ]
})
export class NotificationsListComponent implements OnInit {

  public notificationColumns: string[] = [ 'notification order id', 'notification text', 'mark as read' ];
  public notifications = [];
  public username: string;

  constructor(private notificationService: NotificationsService, private userService: UserService) {
    this.username = userService.getActiveUser();
    this.notificationService.getNotifications(this.username).then(response => {
      this.notifications = response;
    });
  }

  ngOnInit() {
  }

  markAsRead(index) {
    this.notifications[ index ].isRead = true;
    const notification = {
      notificationID: this.notifications[ index ].notificationID,
      notificationText: this.notifications[ index ].notificationText,
      isRead: true,
      username: this.username
    };
    this.notificationService.updateNotification(notification).then(response => {
    });
  }

}
