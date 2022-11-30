import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductListComponent } from './details-product-list.component';

describe('DetailsProductListComponent', () => {
  let component: DetailsProductListComponent;
  let fixture: ComponentFixture<DetailsProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
