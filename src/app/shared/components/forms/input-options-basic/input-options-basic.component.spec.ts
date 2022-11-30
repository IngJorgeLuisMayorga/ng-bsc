import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOptionsBasicComponent } from './input-options-basic.component';

describe('InputOptionsBasicComponent', () => {
  let component: InputOptionsBasicComponent;
  let fixture: ComponentFixture<InputOptionsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOptionsBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOptionsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
