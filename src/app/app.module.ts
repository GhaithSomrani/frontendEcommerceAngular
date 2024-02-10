import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { UtilityModule } from './utility/utility.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreComponent } from './store/store.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ProductsModule } from './products/products.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    StoreComponent,

  ],
  imports: [
    DatePipe,
    HttpClientModule,
    UtilityModule,
    BrowserModule,
    AppRoutingModule,
    ProductsModule
  ],
  providers: [
    provideClientHydration(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
