import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangeProductComponent } from './price-change-product.component';

describe('PriceChangeProductComponent', () => {
  let component: PriceChangeProductComponent;
  let fixture: ComponentFixture<PriceChangeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceChangeProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceChangeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
