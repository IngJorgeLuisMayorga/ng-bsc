import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextPasswordComponent } from './input-text-password.component';

describe('InputTextPasswordComponent', () => {
  let component: InputTextPasswordComponent;
  let fixture: ComponentFixture<InputTextPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTextPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
