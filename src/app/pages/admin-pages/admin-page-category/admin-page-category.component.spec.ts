import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageCategoryComponent } from './admin-page-category.component';

describe('AdminPageCategoryComponent', () => {
  let component: AdminPageCategoryComponent;
  let fixture: ComponentFixture<AdminPageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
