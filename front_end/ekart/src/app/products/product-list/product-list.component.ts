import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: any;
  public deals: any;
  public recommended: any;
  public isSearch: boolean;
  public searchCountTxt: string;
  private prodSubscription: Subscription;
  private searchSubscription: Subscription;

  constructor(private productService: ProductService) {
    this.productService.search(this.productService.searchTxt);
    this.prodSubscription = this.productService.getProducts().subscribe(response => {
      this.searchCountTxt = (response.length === 0) ? "no results " :
        ((response.length === 1) ? "1 result " : response.length + " results ");
      this.searchCountTxt += "found";
      this.products = response;
    });
    this.searchSubscription = this.productService.isSearchQuery().subscribe(response => {
      this.isSearch = response;
    });
    const filter = { deal: true };
    this.productService.filterProducts(filter).then(response => {
      this.deals = response;
    });
    const recommended = { category: "cycle" };
    this.productService.filterProducts(recommended).then(response => {
      this.recommended = response;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.prodSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
