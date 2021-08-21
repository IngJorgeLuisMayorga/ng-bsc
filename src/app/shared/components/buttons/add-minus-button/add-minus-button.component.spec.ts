import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinusButtonComponent } from './add-minus-button.component';

describe('AddMinusButtonComponent', () => {
  let component: AddMinusButtonComponent;
  let fixture: ComponentFixture<AddMinusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMinusButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
