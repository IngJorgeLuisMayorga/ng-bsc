import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDuoCardComponent } from './product-duo-card.component';

describe('ProductDuoCardComponent', () => {
  let component: ProductDuoCardComponent;
  let fixture: ComponentFixture<ProductDuoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDuoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDuoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
