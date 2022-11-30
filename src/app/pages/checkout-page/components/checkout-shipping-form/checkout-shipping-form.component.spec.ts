import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShippingFormComponent } from './checkout-shipping-form.component';

describe('CheckoutShippingFormComponent', () => {
  let component: CheckoutShippingFormComponent;
  let fixture: ComponentFixture<CheckoutShippingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutShippingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
