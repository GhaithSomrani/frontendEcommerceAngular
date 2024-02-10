import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';

interface Price {
  date: string;
  value: number;
}

interface Product {
  availability: string;
  brand: string;
  category: string;
  imageurl: string;
  name: string;
  prices: Price[];
  reference: string;
  url: string;
}

@Component({
  selector: 'app-price-change-product',
  templateUrl: './price-change-product.component.html',
  styleUrls: ['./price-change-product.component.scss']
})
export class PriceChangeProductComponent implements OnInit, OnChanges {
  @Input() store: string = '';
  products: any[] = [];
  brands: any[] = [];
  categories: any[] = [];
  startDate: string = '';
  endDate: string = new Date().toISOString().split('T')[0];
  selectedBrand: any = '';
  selectedCategory: any = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getPriceChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['store'] && !changes['store'].firstChange) {
      this.getPriceChanges();
    }
  }

  onDateChange(): void {
    this.updateStartDate();
    this.getPriceChanges();
  }

  updateStartDate(): void {
    const endDateObj = new Date(this.endDate);
    const startDateObj = new Date(endDateObj.getTime() - (24 * 60 * 60 * 1000));
    this.startDate = startDateObj.toISOString().split('T')[0];
  }

  getPriceChanges(): void {
    this.productService.getPriceChanges(this.startDate, this.endDate, this.store, this.selectedBrand, this.selectedCategory)
      .subscribe(result => {
        this.brands = Array.from(new Set(result.map((product: any) => product.brand)));
        this.categories = Array.from(new Set(result.map((product: any) => product.category)));
        this.brands.sort();
        this.categories.sort();

        this.products = result.map((product: Product) => ({
          ...product,
          prices: product.prices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }));
      });
  }

  onBrandChange(): void {
    this.getPriceChanges();
  }

  onCategoryChange(): void {
    this.getPriceChanges();
  }
}
