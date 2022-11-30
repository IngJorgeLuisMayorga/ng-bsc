import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateBasicComponent } from './input-date-basic.component';

describe('InputDateBasicComponent', () => {
  let component: InputDateBasicComponent;
  let fixture: ComponentFixture<InputDateBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDateBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
