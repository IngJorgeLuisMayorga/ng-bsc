import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutView2DataComponent } from './checkout-view2-data.component';

describe('CheckoutView2DataComponent', () => {
  let component: CheckoutView2DataComponent;
  let fixture: ComponentFixture<CheckoutView2DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutView2DataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutView2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
