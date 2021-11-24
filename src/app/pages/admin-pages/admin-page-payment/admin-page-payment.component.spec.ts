import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagePaymentComponent } from './admin-page-payment.component';

describe('AdminPagePaymentComponent', () => {
  let component: AdminPagePaymentComponent;
  let fixture: ComponentFixture<AdminPagePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPagePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPagePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
