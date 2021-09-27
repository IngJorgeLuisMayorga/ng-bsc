import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageCouponComponent } from './admin-page-coupon.component';

describe('AdminPageCouponComponent', () => {
  let component: AdminPageCouponComponent;
  let fixture: ComponentFixture<AdminPageCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
