import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDetails2Component } from './checkout-details.component';

describe('CheckoutDetailsComponent', () => {
  let component: CheckoutDetails2Component;
  let fixture: ComponentFixture<CheckoutDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutDetails2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
