import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrderShippingInfoComponent } from './details-order-shipping-info.component';

describe('DetailsOrderShippingInfoComponent', () => {
  let component: DetailsOrderShippingInfoComponent;
  let fixture: ComponentFixture<DetailsOrderShippingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOrderShippingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrderShippingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
