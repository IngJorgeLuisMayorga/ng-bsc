import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageCouponsComponent } from './admin-page-coupons.component';

describe('AdminPageCouponsComponent', () => {
  let component: AdminPageCouponsComponent;
  let fixture: ComponentFixture<AdminPageCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageCouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
