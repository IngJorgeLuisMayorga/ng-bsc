import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommendedCardComponent } from './product-recommended-card.component';

describe('ProductRecommendedCardComponent', () => {
  let component: ProductRecommendedCardComponent;
  let fixture: ComponentFixture<ProductRecommendedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRecommendedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRecommendedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
