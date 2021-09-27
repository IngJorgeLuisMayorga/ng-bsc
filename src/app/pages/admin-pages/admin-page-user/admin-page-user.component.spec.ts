import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageUserComponent } from './admin-page-user.component';

describe('AdminPageUserComponent', () => {
  let component: AdminPageUserComponent;
  let fixture: ComponentFixture<AdminPageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
