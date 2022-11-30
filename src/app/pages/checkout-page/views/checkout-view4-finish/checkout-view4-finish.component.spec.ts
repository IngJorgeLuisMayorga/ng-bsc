import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutView4FinishComponent } from './checkout-view4-finish.component';

describe('CheckoutView4FinishComponent', () => {
  let component: CheckoutView4FinishComponent;
  let fixture: ComponentFixture<CheckoutView4FinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutView4FinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutView4FinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
