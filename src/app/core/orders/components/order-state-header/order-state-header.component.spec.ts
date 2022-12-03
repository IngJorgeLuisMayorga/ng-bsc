import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateHeaderComponent } from './order-state-header.component';

describe('OrderStateHeaderComponent', () => {
  let component: OrderStateHeaderComponent;
  let fixture: ComponentFixture<OrderStateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
