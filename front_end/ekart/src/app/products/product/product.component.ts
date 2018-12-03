import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.scss' ]
})
export class ProductComponent implements OnInit {

  @Input() public product;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewDetails(productId) {
    this.router.navigate([ '/products/', productId ]);
  }

  calcPrice(rate, discount) {
    return (rate - (rate * (discount / 100)));
  }
}
