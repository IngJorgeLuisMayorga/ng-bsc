import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageProductsComponent } from './admin-page-products.component';

describe('AdminPageProductsComponent', () => {
  let component: AdminPageProductsComponent;
  let fixture: ComponentFixture<AdminPageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
