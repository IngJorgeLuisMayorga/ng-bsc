import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagePaymentsComponent } from './admin-page-payments.component';

describe('AdminPagePaymentsComponent', () => {
  let component: AdminPagePaymentsComponent;
  let fixture: ComponentFixture<AdminPagePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPagePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPagePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
