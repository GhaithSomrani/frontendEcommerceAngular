import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  @Input() store: any;
  inputstore: any;
  products: any[] = [];

  showPriceChangeComponent: boolean = false;
  showNewProductComponent: boolean = false;


  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    this.inputstore = this.store.storeId
    console.log(this.store);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((result) => {
      this.products = result.products;
    });
  }
  showPriceChange() {
    this.showPriceChangeComponent = true;
    this.showNewProductComponent = false;
  }

  showNewProduct() {
    this.showPriceChangeComponent = false;
    this.showNewProductComponent = true;
  }




}
