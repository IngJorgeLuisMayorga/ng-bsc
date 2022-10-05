import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutThanksFormComponent } from './checkout-thanks-form.component';

describe('CheckoutThanksFormComponent', () => {
  let component: CheckoutThanksFormComponent;
  let fixture: ComponentFixture<CheckoutThanksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutThanksFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutThanksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
