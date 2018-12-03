import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit {

  public query: string;

  constructor(private productService: ProductService) {
    this.query = "";
  }

  ngOnInit() {
  }

  search() {
    this.productService.search(this.query);
  }
}
