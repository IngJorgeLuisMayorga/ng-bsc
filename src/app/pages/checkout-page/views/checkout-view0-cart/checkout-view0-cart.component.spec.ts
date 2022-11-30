import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutView0CartComponent } from './checkout-view0-cart.component';

describe('CheckoutView0CartComponent', () => {
  let component: CheckoutView0CartComponent;
  let fixture: ComponentFixture<CheckoutView0CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutView0CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutView0CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
