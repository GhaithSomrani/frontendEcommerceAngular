import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PriceChangeProductComponent } from './price-change-product/price-change-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    PriceChangeProductComponent,
    NewProductComponent
  ],
  imports: [
    DatePipe,
    FormsModule,
    NgSelectModule,
    CommonModule
  ],
  exports: [PriceChangeProductComponent, NewProductComponent
  ],
  providers: [
    DatePipe
    // Other providers
  ]
})
export class ProductsModule { }
