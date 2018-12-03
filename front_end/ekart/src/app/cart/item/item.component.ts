import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.scss' ]
})
export class ItemComponent implements OnInit {

  @Input() public product;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  minus(product) {
    product.qty--;
    this.change.emit();
  }

  plus(product) {
    product.qty++;
    this.change.emit();
  }

  removeItem() {
    this.remove.emit(this.product.pid);
  }

  calcPrice(rate, discount) {
    return (rate - (rate * (discount / 100)));
  }
}
