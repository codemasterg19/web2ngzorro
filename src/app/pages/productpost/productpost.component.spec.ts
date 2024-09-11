import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpostComponent } from './productpost.component';

describe('ProductpostComponent', () => {
  let component: ProductpostComponent;
  let fixture: ComponentFixture<ProductpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
