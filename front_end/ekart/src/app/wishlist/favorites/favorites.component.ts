import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { UserService } from '../../profile/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: [ './favorites.component.scss' ]
})
export class FavoritesComponent implements OnInit {

  public favItems: any;
  public activeUser: string;

  constructor(private wishlistService: WishlistService, private userService: UserService) {
    this.activeUser = this.userService.getActiveUser();
    this.favItems = [];
    this.wishlistService.favItems(this.activeUser).then(response => {
      response.forEach(element => {
        if (element.details.length > 0) {
          this.favItems.push(element.details[ 0 ]);
        }
      });
    })
  }

  ngOnInit() {
  }

  remove(id, index) {
    const params = {
      username: this.activeUser,
      pid: id
    };
    this.wishlistService.delete(params).then(response => {
      this.favItems.splice(index, 1);
    });
  }
}
