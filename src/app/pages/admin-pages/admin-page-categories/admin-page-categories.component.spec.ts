import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageCategoriesComponent } from './admin-page-categories.component';

describe('AdminPageCategoriesComponent', () => {
  let component: AdminPageCategoriesComponent;
  let fixture: ComponentFixture<AdminPageCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
