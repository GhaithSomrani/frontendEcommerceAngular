import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { PriceChangeProductComponent } from './products/price-change-product/price-change-product.component';


const routes: Routes = [
  { path: 'store/:storeId', component: StoreComponent },
  { path: 'store/:storeId/products', component: ProductsComponent },
  { path: 'store/:storeId/products/newproduct', component: NewProductComponent },
  { path: 'store/:storeId/products/pricechange', component: PriceChangeProductComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
