import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutView1AccountComponent } from './checkout-view1-account.component';

describe('CheckoutView1AccountComponent', () => {
  let component: CheckoutView1AccountComponent;
  let fixture: ComponentFixture<CheckoutView1AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutView1AccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutView1AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
