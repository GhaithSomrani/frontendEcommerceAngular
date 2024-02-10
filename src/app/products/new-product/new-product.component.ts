import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit, OnChanges {
  productsresult: any;
  @Input() store: string = '';
  products: any = [];
  brands: any[] = [];
  categories: any[] = [];
  startDate: string = '';
  endDate: string = new Date().toISOString().split('T')[0];
  selectedBrand: any = '';
  selectedCategory: any = '';
  filename: any = `newproduct_${this.endDate}_${this.store}`;
  jsonData: any;
  datePipe: any;


  constructor(private productService: ProductService) { }





  ngOnInit(): void {
    this.getNewProducts()

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['store'] && !changes['store'].firstChange) {
      this.getNewProducts();
    }
  }



  getNewProducts() {
    this.productService.getNewProducts(this.endDate, this.store, 1, 140, this.selectedBrand, this.selectedCategory).subscribe(
      result => {
        if (Array.isArray(result)) {
          // If result is already an array
          this.products = result;
        } else if (result && Array.isArray(result.products)) {
          // If result is an object with a 'products' property
          this.products = result.products;
        } else {
          // Handle unexpected data format
          console.error('Unexpected data format:', result);
        }
        // Perform other operations as needed
        this.brands = Array.from(new Set(this.products.map((product: any) => product.brand)));
        this.categories = Array.from(new Set(this.products.map((product: any) => product.category)));
        this.brands.sort();
        this.categories.sort();

        this.filename = `newproduct_${this.endDate}_${this.store}_${this.selectedBrand}_${this.selectedCategory}`

      },
      error => {
        // Handle error
        console.error('Error fetching new products:', error);
      }
    );
  }


  onDateChange(): void {
    this.getNewProducts();
  }

  onBrandChange(): void {
    this.getNewProducts();
  }

  onCategoryChange(): void {
    this.getNewProducts();
  }


  exportToExcel(): void {
    const productsWithFormattedDates = this.products.map((product: any) => {
      return {
        ...product,
        add_date: this.datePipe.transform(new Date(product.add_date), 'dd/MM/yyyy') 
      };
    });

    const csvContent = this.convertArrayToCSV(productsWithFormattedDates);

    const wb: XLSX.WorkBook = XLSX.read(csvContent, { type: 'binary' });

    XLSX.writeFile(wb, `${this.filename}.xlsx`);
  }


  convertArrayToCSV(arr: any[]): string {
    if (!arr || arr.length === 0) {
      console.error("Array is empty or undefined.");
      return '';
    }

    // Extract headers from the first object in the array
    const headers = Object.keys(arr[0]);

    // Generate CSV header
    const header = headers.join(',');

    // Generate CSV rows
    const rows = arr.map(obj => {
      // Check if all headers are present in the object
      const row = headers.map(header => {
        if (obj.hasOwnProperty(header)) {
          // If the property exists, return its value
          return obj[header];
        } else {
          // Log a warning if a header is missing
          console.warn(`Object is missing property '${header}'.`);
          return '';
        }
      });
      return row.join(',');
    });

    // Concatenate header and rows with line breaks
    return `${header}\n${rows.join('\n')}`;
  }
}  