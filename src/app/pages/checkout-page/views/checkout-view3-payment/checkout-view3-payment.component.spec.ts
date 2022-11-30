import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutView3PaymentComponent } from './checkout-view3-payment.component';

describe('CheckoutView3PaymentComponent', () => {
  let component: CheckoutView3PaymentComponent;
  let fixture: ComponentFixture<CheckoutView3PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutView3PaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutView3PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
