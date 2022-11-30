import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutProductListComponent } from './checkout-product-list.component';

describe('CheckoutProductListComponent', () => {
  let component: CheckoutProductListComponent;
  let fixture: ComponentFixture<CheckoutProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
