import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit {

  public query: string;

  constructor(private productService: ProductService,
    private router: Router) {
    this.query = "";
  }

  ngOnInit() {
  }

  search() {
    this.router.navigate([ '/products' ]);
    this.productService.searchTxt = this.query;
    this.productService.search(this.query);
  }
}
