import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageOrderComponent } from './admin-page-order.component';

describe('AdminPageOrderComponent', () => {
  let component: AdminPageOrderComponent;
  let fixture: ComponentFixture<AdminPageOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
