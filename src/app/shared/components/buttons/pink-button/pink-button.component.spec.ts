import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinkButtonComponent } from './pink-button.component';

describe('PinkButtonComponent', () => {
  let component: PinkButtonComponent;
  let fixture: ComponentFixture<PinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
