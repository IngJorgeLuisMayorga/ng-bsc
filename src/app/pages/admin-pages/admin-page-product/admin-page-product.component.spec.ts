import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageProductComponent } from './admin-page-product.component';

describe('AdminPageProductComponent', () => {
  let component: AdminPageProductComponent;
  let fixture: ComponentFixture<AdminPageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
