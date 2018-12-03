import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { CartService } from '../../cart/services/cart.service';
import { UserService } from '../../profile/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: [ './product-details.component.scss' ]
})
export class ProductDetailsComponent implements OnInit {

  public product: any = {};
  public productId: string;
  public quantity: number;
  public reviewForm: FormGroup;
  public avgRatingText: string;
  public reviewFormVisible: boolean;
  public activeUser: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.activeUser = this.userService.getActiveUser();
    this.quantity = 1;
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductWithId(this.productId).then(response => {
      this.product = response[ 0 ];
      if (this.product.reviews && this.product.reviews.length) {
        this.avgRatingText = this.product.reviews.length;
        this.avgRatingText += (this.product.reviews.length === 1) ?
          ' customer reviewed' : ' customers reviewed';
      }
    });
    this.reviewForm = this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    const group = this.formBuilder.group({
      username: [ this.activeUser ],
      title: [ '' ],
      comment: [ '' ],
      rating: [ '' ]
    });
    return group;
  }

  addToCart() {
    const data = {
      qty: this.quantity,
      username: this.activeUser,
      productId: this.productId
    }
    this.cartService.add(data).then(response => {
      console.log('item added to cart successfully ', response)
    });
  }

  addToWishlist() {
    const data = {
      username: this.activeUser,
      productId: this.productId
    }
    this.cartService.addToWishlist(data).then(response => {
      console.log('item added to wishlist successfully ', response)
    });
  }

  submitReview() {
    if (!this.product.reviews) {
      this.product.reviews = [];
    }
    this.product.reviews.push(this.reviewForm.value);
    let avgRating = 0;
    this.product.reviews.forEach(element => {
      avgRating += Number(element.rating);
    });
    avgRating /= this.product.reviews.length;
    this.product.avgRating = avgRating;
    const details = {
      pid: this.productId,
      reviews: this.product.reviews,
      avgRating: avgRating
    };
    this.productService.updateProduct(details);
    this.reviewForm = this.createForm();
  }

  calcPrice(rate, discount) {
    return (rate - (rate * (discount / 100)));
  }

  showReviewForm() {
    this.reviewFormVisible = !this.reviewFormVisible;
  }
  /*Override star rating property*/
  getColor() {
    return 'ok';
  }
}
